<script>
    import TransactionCard from "./TransactionCard.svelte";

    export let name
    export let transactions

    var gainLoss = 0

    $: updateGainLoss(transactions)

    function updateGainLoss(transactions)
    {
        var total = 0

        transactions.forEach((transaction) => 
        {
            if(transaction.buyPrice)
            {
                if(transaction.sellPrice)
                {
                    total += ((transaction.sellPrice / transaction.buyPrice) - 1) * (transaction.percent / 100)
                    console.log(((transaction.sellPrice / transaction.buyPrice) - 1) * (transaction.percent / 100))
                }
                else
                {
                    total += ((transaction.stock.currentPrice / transaction.buyPrice) - 1) * (transaction.percent / 100)
                    
                }
            }
        });

        gainLoss = total * 100
    }

    var menuOpen = false

    export let ownMode = false

    export let deleteStrategy
</script>

<div class="w-full h-min flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-md">
    <div class="flex flex-row items-center gap-4">
        <p class="text-stone-500 font-bold text-xl">{name}</p>
        <div class="flex flex-row items-center gap-1 ml-auto">
            {#if gainLoss >= 0}
                <svg class="w-6 h-6 text-green-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.6568 8.96219L16.2393 10.3731L12.9843 7.10285L12.9706 20.7079L10.9706 20.7059L10.9843 7.13806L7.75404 10.3532L6.34314 8.93572L12.0132 3.29211L17.6568 8.96219Z" fill="currentColor" />
                </svg>
            {:else}
                <svg class="w-6 h-6 text-red-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.0001 3.67157L13.0001 3.67157L13.0001 16.4999L16.2426 13.2574L17.6568 14.6716L12 20.3284L6.34314 14.6716L7.75735 13.2574L11.0001 16.5001L11.0001 3.67157Z" fill="currentColor" />
                </svg>
            {/if}
            <p class="ml-auto font-bold text-3xl {gainLoss >= 0 ? "text-green-300" : "text-red-300"}">{gainLoss.toFixed(1)}%</p>
        </div>

        {#if ownMode}
            <div on:click={() => menuOpen = !menuOpen} class="flex-shrink-0 w-12 rounded-lg hover:bg-stone-200 p-2 h-12 text-stone-500 relative">
                <svg class="w-full h-full group-focus:text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 6C14 7.10457 13.1046 8 12 8C10.8954 8 10 7.10457 10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6Z" fill="currentColor" />
                    <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="currentColor" />
                    <path d="M14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18Z" fill="currentColor" />
                </svg>

                {#if menuOpen}
                    <button on:click={deleteStrategy} class="hover:bg-red-100 shadow py-2 px-6 rounded-lg bg-white text-red-400 absolute font-bold -bottom-2 translate-y-full right-0">Delete</button>
                {/if}
            </div>
        {/if}
    </div>

    <div class="w-full h-16 flex flex-row gap-4 mt-auto">
        {#each transactions as transaction}
            <TransactionCard bind:stock={transaction.stock} 
            bind:buyDateTime={transaction.buyDateTime}
            bind:sellDateTime={transaction.sellDateTime}
            bind:buyPrice={transaction.buyPrice}
            bind:sellPrice={transaction.sellPrice}
            bind:percent={transaction.percent}/>
        {/each}
    </div>
</div>