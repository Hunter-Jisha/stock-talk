<script>
    export let stock
    export let buyDateTime
    export let sellDateTime
    export let buyPrice
    export let sellPrice
    export let percent
</script>

<div class="border-2 shadow-lg {((sellPrice ? sellPrice : stock.currentPrice) / buyPrice) - 1 > 0 ? "border-green-400 shadow-green-100" : ((sellPrice ? sellPrice : stock.currentPrice) / buyPrice) - 1 < 0 ? "border-red-400 shadow-red-200" : "border-stone-500"} h-full w-16 bg-white rounded-lg flex flex-col items-center justify-center">
    <p class="text-sm text-stone-500 font-bold">{stock.ticker}</p>
    <div class="flex flex-row items-center pr-2">
        {#if buyPrice}
            {#if ((sellPrice ? sellPrice : stock.currentPrice) / buyPrice) - 1 >= 0}
                <svg class="w-4 h-4 text-green-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.6568 8.96219L16.2393 10.3731L12.9843 7.10285L12.9706 20.7079L10.9706 20.7059L10.9843 7.13806L7.75404 10.3532L6.34314 8.93572L12.0132 3.29211L17.6568 8.96219Z" fill="currentColor" />
                </svg>
            {:else}
                <svg class="w-4 h-4 text-red-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.0001 3.67157L13.0001 3.67157L13.0001 16.4999L16.2426 13.2574L17.6568 14.6716L12 20.3284L6.34314 14.6716L7.75735 13.2574L11.0001 16.5001L11.0001 3.67157Z" fill="currentColor" />
                </svg>
            {/if}
            <p class="text-sm {((sellPrice ? sellPrice : stock.currentPrice) / buyPrice) - 1 >= 0 ? "text-green-300" : "text-red-300"}">{((((sellPrice ? sellPrice : stock.currentPrice) / buyPrice) - 1) * 100).toFixed(1)}%</p>
        {/if}
    </div>
</div>