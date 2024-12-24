<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { spring } from 'svelte/motion';
	import Button from '$lib/components/ui/button/button.svelte';

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

<main class=" bg-background/50 dark mx-auto flex min-h-screen flex-col">
	<nav class="container mx-auto flex-auto p-4">
		<div class="flex items-center justify-between">
			<h1 class="~text-2xl/5xl text-primary font-serif font-bold">BetteReads</h1>
			<div class="space-x-4">
				<a href="/login"><Button size="lg" class="rounded-2xl text-xl">Get Started</Button></a>
			</div>
		</div>
	</nav>

	<header class="container mx-auto h-full flex-1 text-center">
		{#if ready}
			<h2
				class="text-foreground ~text-xl/5xl mb-6 font-serif font-bold"
				in:fly={{ y: 50, duration: 1000 }}
			>
				Track Your Readings, Share Your Thoughts
			</h2>
			<p
				class="text-foreground/90 ~text-lg/2xl mb-8"
				in:fly={{ y: 50, duration: 1000, delay: 300 }}
			>
				BetteReads is the best choice if you are tired of the other website.
			</p>
			<Button size="lg" class="~text-lg/xl rounded-2xl">Join Us Now</Button>
		{/if}
	</header>
</main>
