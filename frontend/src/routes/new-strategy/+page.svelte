<script>
    import MenuWrapper from "../../lib/MenuWrapper.svelte";
    import { request, gql } from 'graphql-request'
    import {onMount} from "svelte/internal"
    import {message} from "$lib/ErrorMessage.js"

    var name = "Untitled"

    var tickers = []

    var transactions = []

    onMount(() => 
    {
        request(import.meta.env.VITE_BACKEND_URL, gql`{allStocks{ticker}}`)
        .then((data) => 
        {
            tickers = data.allStocks.map((stock) => stock.ticker)
        })
        .catch((error) =>
        {
            message.set(error.message)
        })
    })

    function createStrategy()
    {
        request(import.meta.env.VITE_BACKEND_URL, gql`mutation{createStrategy(sessionId: "${window.localStorage.getItem("sessionId")}", 
            strategy: 
            {
                name: "${name}",
                transactions: 
                [
                    ${transactions.map((transaction) => 
                        `{
                            ticker: "${transaction.ticker}",
                            percent: ${transaction.percent},
                            buyDateTime: ${new Date(transactions[0].buyDateTime).getTime()},
                            sellDateTime: ${new Date(transactions[0].buyDateTime).getTime() + getHoldTime(transaction.holdTimeNumber, transaction.holdTimeUnit)}
                        }`
                    )}
                ]
            })
            {
                id
            }
        }`)
        .then(() => 
        {
            window.location.href = "/profile"
        })
        .catch((error) =>
        {
            message.set(error.message)
        })
    }

    function getHoldTime(value, units)
    {
        switch(units)
        {
            case "minute":
            {
                return value * 60000
            }
            case "hour":
            {
                return value * 60000 * 60
            }
            case "day":
            {
                return value * 60000 * 60 * 24
            }
            case "week":
            {
                return value * 60000 * 60 * 24 * 7
            }
        }
    }
</script>

<MenuWrapper>
    <div class="w-full h-full flex flex-col gap-4 items-center justify-center bg-stone-100">
        <p class="text-2xl text-stone-500">New Strategy</p>
        <div class="w-full md:w-[40rem] flex flex-col p-6 gap-4 rounded-2xl bg-white shadow">
            <div class="flex flex-col w-full gap-1">
                <p class="text-md text-stone-700">Name</p>
                <input class="w-full h-12 text-2xl text-stone-700 font-bold bg-stone-100 rounded-xl px-4" placeholder="Name" type="text" bind:value={name}>
            </div>

            <div class="w-full flex flex-col gap-8 max-h-96 overflow-y-auto">
                {#each transactions as transaction, index}
                    <div class="flex flex-col gap-4 p-8 group rounded-2xl">
                        <div class="flex justify-between flex-row gap-4 items-center">
                            <div class="flex flex-col text-xl text-stone-500 gap-2">
                                <p class="text-sm md:text-xl">Stock</p>
                                <select class="px-2 h-12 rounded-lg bg-stone-100 text-stone-700 w-24" bind:value={transaction.ticker} >
                                    {#each tickers as ticker}
                                        <option>{ticker}</option>
                                    {/each}
                                </select>
                            </div>

                            <div class="flex flex-col text-xl text-stone-500 gap-2">
                                <p class="text-sm md:text-xl">Percent of Investment</p>
                                <div class="flex flex-row items-center gap-2">
                                    <input class="px-2 h-12 rounded-lg bg-stone-100 text-stone-700 w-16" bind:value={transaction.percent} type="text" placeholder="0">
                                    <p class="text-2xl text-stone-700">%</p>
                                </div>
                            </div>

                            <button on:click={() => {transactions.splice(index, 1); transactions = transactions}} class="bg-red-100 hover:bg-red-200 text-red-400 p-2 w-10 h-10 rounded-lg">
                                <svg class="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17 6V5C17 3.89543 16.1046 3 15 3H9C7.89543 3 7 3.89543 7 5V6H4C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8H5V19C5 20.6569 6.34315 22 8 22H16C17.6569 22 19 20.6569 19 19V8H20C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6H17ZM15 5H9V6H15V5ZM17 8H7V19C7 19.5523 7.44772 20 8 20H16C16.5523 20 17 19.5523 17 19V8Z" fill="currentColor" />
                                </svg>
                            </button>
                        </div>

                        <div class="flex flex-row gap-4 justify-between">
                            <div class="flex flex-col gap-2">
                                <p class="text-sm md:text-xl text-stone-500">Purchase Date</p>
                                <input bind:value={transaction.buyDateTime} class="h-12 text-sm border-b-2 border-stone-500 pb-1 focus:border-sky-400" type="datetime-local">
                            </div>

                            <div class="flex flex-col gap-2">
                                <p class="text-sm md:xtext-xl text-stone-500">Hold Time</p>
                                <div class="flex flex-row h-12 gap-2">
                                    <input class="h-full text-xl w-16 bg-stone-100 rounded-lg px-2 text-stone-700" bind:value={transaction.holdTimeNumber} placeholder="0" type="number">
                                    <select bind:value={transaction.holdTimeUnit} class="h-full w-24 bg-stone-100 rounded-lg px-2 text-stone-700">
                                        <option value="minute">Minute{transaction.holdTimeNumber > 1 ? "s" : ""}</option>
                                        <option value="hour">Hour{transaction.holdTimeNumber > 1 ? "s" : ""}</option>
                                        <option value="day">Day{transaction.holdTimeNumber > 1 ? "s" : ""}</option>
                                        <option value="week">Week{transaction.holdTimeNumber > 1 ? "s" : ""}</option>
                                        <option value="month">Month{transaction.holdTimeNumber > 1 ? "s" : ""}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
            

            <button on:click={() => transactions = [...transactions, {}]} class="w-full h-12 p-2 flex items-center justify-center border-2 border-sky-400 rounded-xl text-sky-400 hover:bg-sky-400 hover:text-white">
                <svg class="h-full aspect-square" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z" fill="currentColor" />
                </svg>
            </button>

            <div class="flex flex-row justify-between h-10">
                <button on:click={() => window.location.href = "/profile"} class="h-full px-6 rounded-lg text-lg font-bold text-red-400 hover:bg-red-400 hover:text-white">Cancel</button>
                <button on:click={createStrategy} class="h-full px-6 rounded-lg text-lg font-bold text-white bg-sky-400 hover:bg-sky-500">Create</button>
            </div>
        </div>
    </div>
</MenuWrapper>