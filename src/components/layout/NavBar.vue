<template>
    <nav class="nav-bar">
        <slot name="nav-top"></slot>
        <slot name="nav-center"></slot>
        <slot name="nav-bottom"></slot>
    </nav>
</template>


<script setup lang="ts">

</script>


<style scoped>

nav {
    display: flex;
    flex: auto;
    flex-direction: column;
    height: 100vh;
    min-width: 10vw;
    max-width: 20vw;
    font-size: 12px;
    text-align: center;

    background-color: var(--color-background-soft);
}
</style>

<style>
a {
    display: inline-block;
    width: 100%;
    padding: 1rem;
    border-left: 1px solid var(--color-border);
}

a.router-link-exact-active {
    color: var(--color-text);
}

a.router-link-exact-active:hover {
    background-color: transparent;
}
</style>