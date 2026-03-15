<script>
  import '../app.css';
  let { children } = $props();
</script>

<a
  href="#main-content"
  class="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:bg-white focus-visible:px-4 focus-visible:py-2 focus-visible:rounded-lg focus-visible:shadow-lg focus-visible:text-sm focus-visible:font-medium focus-visible:text-gray-900 focus-visible:outline-2 focus-visible:outline-amber-600"
>
  Skip to content
</a>

{@render children()}
