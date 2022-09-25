<svelte:head>
    <meta name="theme-color" content="#F5F5F4">
</svelte:head>

<div class="w-screen h-screen bg-stone-100 flex flex-col md:flex-row pb-20 md:pb-0 md:pl-20">
    <div class="z-20 p-2 md:p-4 fixed bottom-0 items-start left-0 w-full h-24 md:h-full md:w-20 bg-sky-500 flex gap-6 flex-row md:flex-col overflow-hidden md:hover:w-64 transition-all justify-around md:justify-start">
        <!--Top Logo--> 
        <button class="hidden md:flex mb-6 flex-shrink-0 w-full flex-row items-center gap-4 text-white">
            <div class="w-12 aspect square flex-shrink-0">
                <img class="flex-shrink-0 w-12 h-12" src="/logo-white.png" alt="logo">
            </div>

            <p class="text-xl font-bold whitespace-nowrap">StockTalk</p>
        </button>

        <button on:click={() => window.location.href = "/leaderboard"} class="md:hover:bg-opacity-20 bg-white bg-opacity-0 w-min md:w-full flex flex-row items-center gap-4 text-white rounded-xl">
            <svg class="flex-shrink-0 w-12 aspect-square p-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13 15.9C15.2822 15.4367 17 13.419 17 11V4H7V11C7 13.419 8.71776 15.4367 11 15.9V18H9V20H15V18H13V15.9ZM9 6H15V11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11V6Z" fill="currentColor" />
                    <path d="M18 6H20V11H18V6Z" fill="currentColor" />
                    <path d="M6 6H4V11H6V6Z" fill="currentColor" />
                </svg>

            <p class="hidden md:block text-xl whitespace-nowrap">Leaderboard</p>
        </button>

        <button on:click={() => window.location.href = "/home"} class="md:hover:bg-opacity-20 bg-white bg-opacity-0 w-min md:w-full flex flex-row items-center gap-4 text-white rounded-xl">
            <svg class="flex-shrink-0 w-12 aspect-square p-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M21 8.77217L14.0208 1.79299C12.8492 0.621414 10.9497 0.621413 9.77817 1.79299L3 8.57116V23.0858H10V17.0858C10 15.9812 10.8954 15.0858 12 15.0858C13.1046 15.0858 14 15.9812 14 17.0858V23.0858H21V8.77217ZM11.1924 3.2072L5 9.39959V21.0858H8V17.0858C8 14.8767 9.79086 13.0858 12 13.0858C14.2091 13.0858 16 14.8767 16 17.0858V21.0858H19V9.6006L12.6066 3.2072C12.2161 2.81668 11.5829 2.81668 11.1924 3.2072Z" fill="currentColor" />
            </svg>

            <p class="hidden md:block text-xl whitespace-nowrap">Home</p>
        </button>

        <button on:click={() => window.location.href = "/profile"} class="md:hover:bg-opacity-20 bg-white bg-opacity-0 w-min md:w-full flex flex-row items-center gap-4 text-white rounded-xl">
            <svg class="flex-shrink-0 w-12 aspect-square p-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9ZM14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z" fill="currentColor" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 14.0902 3.71255 16.014 4.90798 17.5417C6.55245 15.3889 9.14627 14 12.0645 14C14.9448 14 17.5092 15.3531 19.1565 17.4583C20.313 15.9443 21 14.0524 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 21C9.84977 21 7.87565 20.2459 6.32767 18.9878C7.59352 17.1812 9.69106 16 12.0645 16C14.4084 16 16.4833 17.1521 17.7538 18.9209C16.1939 20.2191 14.1881 21 12 21Z" fill="currentColor" />
            </svg>

            <p class="hidden md:block text-xl whitespace-nowrap">Profile</p>
        </button>
    </div>

    <div class="w-full h-full relative">
        <slot/>
    </div>
</div>