# A/B Testing System

A comprehensive A/B testing implementation for Next.js using Vercel's `@vercel/flags` library, featuring stable user bucketing, middleware-based routing, and component variants.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Configuration](#configuration)
- [Core Components](#core-components)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Development Tools](#development-tools)
- [Extending the System](#extending-the-system)

## Overview

This A/B testing system provides a complete solution for running experiments with:

- **Stable User Bucketing**: Users receive consistent experiences across sessions
- **Middleware Integration**: Seamless routing to different variants
- **Static Generation Support**: Pre-generates all variant combinations
- **Component-Level Testing**: Easy A/B testing of React components
- **Development Tools**: Built-in debugging and testing utilities

## Architecture

The system follows a layered architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer                           │
│  ┌─────────────────────┐  ┌─────────────────────────────────┐│
│  │   Component A       │  │       Component B               ││
│  │   (Control)         │  │       (Test)                    ││
│  └─────────────────────┘  └─────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                     Route Layer                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │             [code] Route Segment                        ││
│  │    Handles all variant paths (/abc123/*, /xyz789/*)    ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    Middleware Layer                         │
│  ┌─────────────────────┐  ┌─────────────────────────────────┐│
│  │  Active Middleware  │  │    Inactive Middleware          ││
│  │  (A/B Test On)      │  │    (Default Route)              ││
│  └─────────────────────┘  └─────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                      Core Layer                             │
│ ┌─────────┐ ┌─────────────┐ ┌─────────────┐ ┌──────────────┐│
│ │  Flags  │ │  Stable ID  │ │  Bucketing  │ │  Dev Tools   ││
│ └─────────┘ └─────────────┘ └─────────────┘ └──────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## Configuration

### Environment Configuration

The system is controlled via the `AB_TEST_CONFIG` in `/src/lib/constants.ts`:

```typescript
export const AB_TEST_CONFIG = {
  ENABLED: false, // Toggle A/B testing on/off
};

export const HEADERS = {
  STABLE_ID: "x-generated-stable-id",
};

export const COOKIES = {
  STABLE_ID: "stable-id",
};
```

### Middleware Configuration

Configure which routes should be included in A/B testing in `/src/middleware.ts`:

```typescript
export const config = {
  matcher: ["/", "/products/:path*"], // Routes to include in A/B testing
};
```

## Core Components

### 1. Flag Definition (`flags.ts`)

Defines the A/B test experiments and their logic:

```typescript
export const showTestVariant = flag<boolean, EvaluationContext>({
  key: "show-test-variant",
  description: "Shows the test variant",
  defaultValue: false,
  identify,
  decide({ entities }) {
    if (!entities || !entities.stableId) return this.defaultValue!;
    // Uses xxHash32 for consistent bucketing
    return bucket(`${this.key}/${entities.stableId}`) === 1;
  },
});
```

**Key Features:**
- **Consistent Bucketing**: Uses xxHash32 for deterministic user assignment
- **Experiment Isolation**: Each flag uses its own key for independent bucketing
- **Default Fallback**: Handles cases where stable ID is unavailable

### 2. Stable ID Management (`get-stable-id.ts`)

Manages persistent user identification across sessions:

```typescript
export const getStableId = dedupe(async () => {
  const cookiesStore = await cookies();
  const header = await headers();

  // Check for header-based stable ID (from middleware)
  const generatedStableId = header.get(HEADERS.STABLE_ID);
  if (generatedStableId) {
    return { value: generatedStableId, isFresh: false };
  }

  // Check for cookie-based stable ID
  const stableId = cookiesStore.get(COOKIES.STABLE_ID)?.value;
  if (!stableId) return { value: nanoid(), isFresh: true };
  return { value: stableId, isFresh: false };
});
```

**Key Features:**
- **Persistent Identity**: Uses cookies to maintain user identity across sessions
- **Fresh ID Detection**: Tracks when new IDs are generated
- **Request Deduplication**: Uses `dedupe` to prevent multiple ID generations per request

### 3. Middleware System (`middleware.ts`)

Handles routing logic for A/B tests:

#### Active A/B Testing Mode
```typescript
export async function activeABTestMiddleware(request: NextRequest) {
  const stableId = await getStableId();
  const code = await precompute(flags); // Generates variant code
  const nextUrl = new URL(
    `/${code}${request.nextUrl.pathname}${request.nextUrl.search}`,
    request.url,
  );

  if (stableId.isFresh) {
    request.headers.set(HEADERS.STABLE_ID, stableId.value);
  }
  const headers = new Headers();
  headers.append("set-cookie", `${COOKIES.STABLE_ID}=${stableId.value}`);
  return NextResponse.rewrite(nextUrl, { request, headers });
}
```

#### Inactive Mode (Default Route)
```typescript
export async function inactiveABTestMiddleware(request: NextRequest) {
  const defaultCode = await getDefaultCode();
  return NextResponse.rewrite(
    new URL(
      `/${defaultCode}${request.nextUrl.pathname}${request.nextUrl.search}`,
      request.url,
    ),
    { request },
  );
}
```

### 4. Route Segment Handler (`[code]/layout.tsx`)

Manages variant rendering and static generation:

```typescript
export async function generateStaticParams() {
  if (!AB_TEST_CONFIG.ENABLED) {
    const defaultCode = await getDefaultCode();
    return [{ code: defaultCode }];
  }

  // Pre-generates all possible variant combinations
  const codes = await generatePermutations(flags);
  return codes.map((code) => ({ code }));
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const values = await deserialize(flags, code);
  const encryptedFlagValues = await encryptFlagValues(values);

  return (
    <>
      <Navbar />
      {children}
      <FlagValues values={encryptedFlagValues} />
      <DevTools />
    </>
  );
}
```

**Key Features:**
- **Static Generation**: Pre-builds all variant combinations for optimal performance
- **Flag Hydration**: Provides flag values to client-side components
- **Development Tools**: Includes debugging utilities in development

## Usage

### 1. Basic Component A/B Testing

Create control and test variants of your components:

```typescript
// In your page component
const abTestIsActive = await showTestVariant(code, flags);

return (
  <div>
    {abTestIsActive ? (
      <ProductHeroTest {...props} />
    ) : (
      <ProductHeroControl {...props} />
    )}
  </div>
);
```

### 2. Page-Level Testing

Test different page layouts or content:

```typescript
export default async function Home({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const abTestIsActive = await showTestVariant(code, flags);

  return (
    <div className="min-h-screen bg-background">
      <div className="text-center my-12">
        <h2 className="text-3xl  mb-2">Featured Products</h2>
        {abTestIsActive && <Badge variant="secondary">AB Test Active</Badge>}
        <p className="text-lg text-muted-foreground">
          Discover amazing products at great prices
        </p>
      </div>
      {/* Rest of component */}
    </div>
  );
}
```

### 3. API Route Integration

A/B testing works seamlessly with API routes:

```typescript
// API routes automatically receive the correct variant context
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
```

## API Reference

### Core Functions

#### `bucket(key: string, buckets: number = 2)`
Consistently assigns a string key to one of N buckets using xxHash32.

**Parameters:**
- `key`: String to hash (typically `${experimentName}/${stableId}`)
- `buckets`: Number of buckets (default: 2 for A/B testing)

**Returns:** Bucket number (0 to buckets-1)

#### `getStableId()`
Retrieves or generates a persistent user identifier.

**Returns:** `Promise<{ value: string, isFresh: boolean }>`

#### `identify()`
Creates an evaluation context with the current user's stable ID.

**Returns:** `Promise<{ stableId: string }>`

### Flag Functions

#### `showTestVariant(code: string, flags: typeof flags)`
Evaluates whether to show the test variant for a given code.

**Parameters:**
- `code`: Serialized flag values from route parameters
- `flags`: Array of flag definitions

**Returns:** `Promise<boolean>`

### Middleware Functions

#### `activeABTestMiddleware(request: NextRequest)`
Handles routing when A/B testing is enabled.

#### `inactiveABTestMiddleware(request: NextRequest)`
Handles routing when A/B testing is disabled (default behavior).

## Development Tools

### Dev Tools Component

The system includes a floating development panel for testing:

```typescript
export function DevTools() {
  const deleteCookie = () => {
    document.cookie = `${COOKIES.STABLE_ID}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    router.refresh();
  };

  return (
    <div className="fixed bottom-2 right-2 p-3 bg-[#333333] rounded shadow-lg z-50">
      <button onClick={deleteCookie}>
        Reset Stable ID
      </button>
    </div>
  );
}
```

**Features:**
- **Stable ID Reset**: Clear user's stable ID to test different variants
- **Session Refresh**: Automatically refreshes to apply changes

### Testing Different Variants

1. **Enable A/B Testing**: Set `AB_TEST_CONFIG.ENABLED = true`
2. **Visit Your Site**: Navigate to any configured route
3. **Reset Identity**: Use dev tools to clear stable ID and get reassigned
4. **Check Network**: Monitor middleware rewrites in browser dev tools

## Extending the System

### Adding New Experiments

1. **Define New Flag**:
```typescript
export const newExperiment = flag<boolean, EvaluationContext>({
  key: "new-experiment",
  description: "Description of new test",
  defaultValue: false,
  identify,
  decide({ entities }) {
    if (!entities || !entities.stableId) return this.defaultValue!;
    return bucket(`${this.key}/${entities.stableId}`) === 1;
  },
});

export const flags = [showTestVariant, newExperiment] as const;
```

2. **Use in Components**:
```typescript
const newExperimentActive = await newExperiment(code, flags);
```

### Multi-Variant Testing

For tests with more than 2 variants, modify the bucketing:

```typescript
export const multiVariantTest = flag<number, EvaluationContext>({
  key: "multi-variant-test",
  description: "Test with 3 variants",
  defaultValue: 0,
  identify,
  decide({ entities }) {
    if (!entities || !entities.stableId) return this.defaultValue!;
    return bucket(`${this.key}/${entities.stableId}`, 3); // 3 variants: 0, 1, 2
  },
});
```

### Advanced Bucketing Logic

Implement custom logic for user assignment:

```typescript
export const advancedExperiment = flag<boolean, EvaluationContext>({
  key: "advanced-experiment",
  description: "Advanced experiment with custom logic",
  defaultValue: false,
  identify,
  decide({ entities }) {
    if (!entities || !entities.stableId) return this.defaultValue!;
    
    // Custom logic: only include users with specific stable ID patterns
    const hash = bucket(`${this.key}/${entities.stableId}`, 100);
    
    // Only 10% of users in the test
    if (hash >= 10) return this.defaultValue!;
    
    // Of the 10%, split 50/50 between control and test
    return bucket(`${this.key}-variant/${entities.stableId}`) === 1;
  },
});
```

## Performance Considerations

### Static Generation
- All variant combinations are pre-generated at build time
- No runtime performance impact from flag evaluation
- Optimal caching and CDN distribution

### Middleware Efficiency
- Stable ID generation is deduped per request
- Cookie operations are minimized
- Clean URL rewrites maintain SEO benefits

### Client Hydration
- Flag values are encrypted and embedded in the page
- No additional client-side API calls required
- Consistent rendering between server and client

## Best Practices

1. **Start Small**: Begin with simple boolean flags before complex multi-variant tests
2. **Monitor Performance**: Track the impact of different variants on key metrics
3. **Clean Up**: Remove concluded experiments and their associated code
4. **Document Changes**: Keep track of active experiments and their purposes
5. **Test Thoroughly**: Verify both variants work correctly before deploying
6. **Consider SEO**: Ensure A/B tests don't negatively impact search rankings

## Troubleshooting

### Common Issues

**Inconsistent User Experience**
- Verify stable ID is properly set and persisted
- Check that flag keys are unique across experiments

**Variants Not Showing**
- Confirm `AB_TEST_CONFIG.ENABLED = true`
- Verify middleware matcher includes your routes

**Static Generation Errors**
- Ensure all flags are properly exported
- Check that `generatePermutations` can access flag definitions

**Performance Issues**
- Monitor middleware execution time
- Consider reducing the number of simultaneous experiments
