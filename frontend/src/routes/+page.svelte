<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { spring } from 'svelte/motion';

	let ready = false;
	let y = spring(50, { stiffness: 0.1, damping: 0.25 });

	onMount(() => {
		ready = true;
		setTimeout(() => y.set(0), 100);
	});

	let features = [
		{
			icon: '📚',
			title: 'Vast Library',
			description: 'Access millions of books across all genres'
		},
		{
			icon: '🤖',
			title: 'AI Recommendations',
			description: 'Get personalized book suggestions powered by AI'
		},
		{
			icon: '👥',
			title: 'Social Reading',
			description: 'Join reading groups and share your thoughts'
		},
		{
			icon: '📊',
			title: 'Advanced Analytics',
			description: 'Track your reading habits with detailed insights'
		}
	];
</script>

<svelte:head>
	<title>LiteraryLink - Your Ultimate Reading Companion</title>
</svelte:head>

<main class="to-blue- min-h-screen bg-[#1A120B] text-white">
	<nav class="container mx-auto p-4">
		<div class="flex items-center justify-between">
			<h1 class="~text-2xl/5xl font-serif font-bold text-[#E5E5CB]">BetteReads</h1>
			<div class="space-x-4">
				<a href="#features" class="hover:underline">Features</a>
				<a
					href="#"
					class="rounded-full bg-white px-4 py-2 text-purple-600 transition hover:bg-opacity-90"
					>Sign Up</a
				>
			</div>
		</div>
	</nav>

	<header class="container mx-auto py-20 text-center">
		{#if ready}
			<h2 class="mb-6 text-5xl font-bold" in:fly={{ y: 50, duration: 1000 }}>
				Discover Your Next Great Read
			</h2>
			<p class="mb-8 text-xl" in:fly={{ y: 50, duration: 1000, delay: 300 }}>
				LiteraryLink: Where every page turns into an adventure
			</p>
			<a
				href="#"
				class="rounded-full bg-white px-6 py-3 text-lg font-semibold text-purple-600 transition hover:bg-opacity-90"
				in:fly={{ y: 50, duration: 1000, delay: 600 }}
			>
				Get Started
			</a>
		{/if}
	</header>

	<section id="features" class="container mx-auto py-20">
		<h3 class="mb-12 text-center text-3xl font-bold">Why Choose LiteraryLink?</h3>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			{#each features as feature, i}
				<div
					class="rounded-lg bg-white bg-opacity-10 p-6 backdrop-blur-lg"
					in:fade={{ duration: 300, delay: i * 150 }}
				>
					<div class="mb-4 text-4xl">{feature.icon}</div>
					<h4 class="mb-2 text-xl font-semibold">{feature.title}</h4>
					<p class="text-gray-200">{feature.description}</p>
				</div>
			{/each}
		</div>
	</section>

	<footer class="container mx-auto py-8 text-center">
		<p>&copy; 2024 LiteraryLink. All rights reserved.</p>
	</footer>
</main>

<style lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	:global(body) {
		@apply antialiased;
	}
</style>
