<script>
    import { onMount } from "svelte/internal";
    import MenuWrapper from "../../lib/MenuWrapper.svelte";
    import { request, gql } from 'graphql-request'
    import Form from "$lib/Form.svelte"

    onMount(() => 
    {
        request(import.meta.env.VITE_BACKEND_URL, gql`{ping}`)
        .then((data) => 
        {
            console.log(data)
        })
    })

    var allTimeMode = false
</script>

<MenuWrapper>
    <div class="w-full h-full flex flex-col gap-2 bg-stone-100 p-4">
        <p class="font-bold text-4xl text-sky-400">StockTalk Leaderboard</p>

        <div class="w-full h-12 bg-stone-200 rounded-lg flex flex-row relative p-1.5 text-stone-700">
            <div class="absolute p-1.5 top-0 left-0 w-full h-full">
                <div class="w-full h-full relative">
                    <div class="{allTimeMode ? "left-1/2" : "left-0"} transition-all h-full w-1/2 absolute bg-white rounded-lg"></div>
                </div>
            </div>

            <button on:click={() => allTimeMode = false} class="z-10 w-full h-full">
                Today
            </button>

            <button on:click={() => allTimeMode = true} class="z-10 w-full h-full">
                All Time
            </button>

            
        </div>

        
    </div>
</MenuWrapper>