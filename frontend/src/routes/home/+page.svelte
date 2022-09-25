<script>
    import { onMount } from "svelte/internal";
    import MenuWrapper from "../../lib/MenuWrapper.svelte";
    import { request, gql } from 'graphql-request'
    import Form from "$lib/Form.svelte"
    import StrategyCard from "../../lib/StrategyCard.svelte";
    import Loader from "../../lib/Loader.svelte";
    import {message} from "$lib/ErrorMessage.js"

    var nameSeachQuery = ""

    var seachedUsers = []

    var feed = []

    var exploreRandomProfiles = true

    var loaded = false

    onMount(() => 
    {
        if(window.localStorage.getItem("sessionId"))
        {
            request(import.meta.env.VITE_BACKEND_URL, gql`{session(id: "${window.localStorage.getItem("sessionId")}")
            {
                user
                {
                    following
                    {
                        following
                        {
                            email
                            strategies
                            {
                                id
                                name
                                transactions
                                {
                                    buyPrice
                                    sellPrice
                                    buyDateTime
                                    sellDateTime
                                    percent
                                    stock
                                    {
                                        ticker
                                        currentPrice
                                    }
                                }
                            }
                        }
                    }
                }
            }}`)
            .then((data) => 
            {
                feed = [].concat.apply([], data.session.user.following.map((following) => following.following.strategies));
                loaded = true
            })
            .catch((error) =>
            {
                message.set(error.message)
            })
        }
    })

    $: searchForUser(nameSeachQuery)

    function searchForUser(nameSeachQuery)
    {
        if(nameSeachQuery == "")
        {
            seachedUsers = []
        }
        else
        {
            request(import.meta.env.VITE_BACKEND_URL, gql`{searchForUserByName(name: "${nameSeachQuery}"){username email}}`)
            .then((response) => 
            {
                seachedUsers = response.searchForUserByName
            })
            .catch((error) =>
            {
                message.set(error.message)
            })
        }
    }
</script>

<MenuWrapper>
    <Loader bind:loaded={loaded}>

    </Loader>
    <div class="w-full h-full flex flex-row gap-2 md:p-4 bg-stone-100 justify-center">
        <div class="w-full md:w-1/2 h-full flex flex-col gap-2">
            <div class="flex flex-row w-full px-4 py-2t justify-between items-center">
                <p class="font-bold text-4xl text-sky-400">StockTalk</p>
            </div>
    
            <div class="w-full h-12 px-4 relative flex-shrink-0">
                <input bind:value={nameSeachQuery} class="w-full h-full rounded-xl bg-white px-4 text-stone-700 text-lg" type="text" placeholder="Search" name="search">
                
                <svg class="h-full aspect-square text-stone-500 p-3 absolute top-1/2 right-4 -translate-y-1/2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z" fill="currentColor" />
                </svg>

                {#if seachedUsers.length != 0}
                    <div class="absolute translate-y-2 px-4 left-0 -bottom-18 w-full">
                        <div class="z-20 w-full flex flex-col bg-white rounded-xl p-2 shadow-md">
                            {#each seachedUsers as user}
                                <button on:click={() => window.location.href = `/profile/${user.email}`} class="hover:bg-stone-100 rounded-xl p-2 w-full h-12 flex flex-row items-center gap-4">
                                    <div class="flex items-center justify-center rounded-full h-full aspect-square bg-sky-400 text-white font-bold text-lg">
                                        <p>{user.username[0]}</p>
                                    </div>

                                    <p class="text-stone-700 text-xl">{user.username}</p>
                                </button>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>
    
            {#if exploreRandomProfiles}
                <div class="w-full flex flex-col">
                    <div class="flex flex-row h-10 w-full justify-between items-center px-4">
                        <p class="text-stone-500 text-md">Explore random profiles</p>
        
                        <button on:click={() => exploreRandomProfiles = false} class="h-full text-stone-500 p-0.5">
                            <svg class="h-full aspect-square" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" fill="currentColor" />
                            </svg>
                        </button>
                    </div>
        
                    <div class="w-full h-24 md:h-28 flex flex-row overflow-x-auto gap-2 py-2 px-4">
                        <div class="h-full bg-white rounded-xl shadow-md flex flex-row p-4 gap-4 items-center">
                            <div class="h-full aspect-square flex-shrink-0 bg-sky-400 text-white font-bold text-lg rounded-full flex items-center justify-center">
                                <p>M</p>
                            </div>
        
                            <div class="flex flex-col h-full justify-between">
                                <p class="text-stone-700 font-bold text-2xl md:text-xl">MagicPants</p>
                                <p class="text-stone-500 text-lg">13 Strategies</p>
                            </div>
                        </div>
        
                        <div class="h-full bg-white rounded-xl shadow-md flex flex-row p-4 gap-4 items-center">
                            <div class="h-full aspect-square flex-shrink-0 bg-sky-400 text-white font-bold text-lg rounded-full flex items-center justify-center">
                                <p>S</p>
                            </div>
        
                            <div class="flex flex-col h-full justify-between">
                                <p class="text-stone-700 font-bold text-2xl md:text-xl">SuperTrader</p>
                                <p class="text-stone-500 text-lg">8 Strategies</p>
                            </div>
                        </div>
        
                        <div class="h-full bg-white rounded-xl shadow-md flex flex-row p-4 gap-4 items-center">
                            <div class="h-full aspect-square flex-shrink-0 bg-sky-400 text-white font-bold text-lg rounded-full flex items-center justify-center">
                                <p>I</p>
                            </div>
        
                            <div class="flex flex-col h-full justify-between">
                                <p class="text-stone-700 font-bold text-2xl md:text-xl">InvestorMan123</p>
                                <p class="text-stone-500 text-lg">1 Strategy</p>
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
    
            <div class="w-full h-full flex-grow-0 flex flex-col gap-0">
                <p class="pl-4 text-stone-500 text-md">Feed</p>
                <div class="w-full h-full relative">
                    <div class="w-full h-full absolute flex flex-grow-0 flex-col gap-4 overflow-y-auto p-2">
                        {#each feed as strategy}
                            <StrategyCard bind:name={strategy.name} bind:transactions={strategy.transactions}/>
                        {/each}
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</MenuWrapper>