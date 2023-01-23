<script lang="ts">

    export let pageBody
    let role = localStorage.getItem('role');

    function checkSignOut() {
        localStorage.setItem("token", "");
        localStorage.setItem("role", "");
        localStorage.setItem("id", "");
        localStorage.setItem("username", "");
    }

    let navActive = false;
    const toggleNav = () => {
        navActive = !navActive;

        let home = document.getElementById("home");
        let customer = document.getElementById("customer");
        let converter = document.getElementById("converters");
        let ticket = document.getElementById("tickets");
        let signOut = document.getElementById("signOut");

        let homeText = document.getElementById("homeText");
        let customerText = document.getElementById("customerText");
        let converterText = document.getElementById("converterText");
        let ticketText = document.getElementById("ticketText");
        let signOutText = document.getElementById("signOutText");

        if (role === "Client"){
            homeText.style.top = "123px"
            converterText.style.top = "183px";
            ticketText.style.top = "243px";
            signOutText.style.top = "303px";
        } else {
            homeText.style.top = "123px";
            customerText.style.top = "183px";
            converterText.style.top = "243px";
            ticketText.style.top = "303px";
            signOutText.style.top = "363px";
        }

        if (navActive) {
            if (customer !== null && customerText !== null) {
                customer.style.backgroundPositionX = "9%"
                customer.style.width = "80%";
                customerText.style.color = "black";
                customerText.style.transition = "1000ms";
            }

            home.style.backgroundPositionX = "9%"
            converter.style.backgroundPositionX = "9%"
            ticket.style.backgroundPositionX = "9%"
            signOut.style.backgroundPositionX = "9%"

            home.style.width = "80%";
            converter.style.width = "80%";
            ticket.style.width = "80%";
            signOut.style.width = "80%";

            homeText.style.color = "black";
            converterText.style.color = "black";
            ticketText.style.color = "black";
            signOutText.style.color = "black";

            homeText.style.transition = "1000ms";
            converterText.style.transition = "1000ms";
            ticketText.style.transition = "1000ms";
            signOutText.style.transition = "1000ms";

        } else {
            if (customer !== null && customerText !== null) {
                customerText.style.transition = "200ms";
                customerText.style.color = "transparent";
                customer.style.width = "45px";
                customer.style.background = "";
            }

            homeText.style.transition = "200ms";
            converterText.style.transition = "200ms";
            ticketText.style.transition = "200ms";
            signOutText.style.transition = "200ms";

            homeText.style.color = "transparent";
            converterText.style.color = "transparent";
            ticketText.style.color = "transparent";
            signOutText.style.color = "transparent";

            home.style.width = "45px";
            converter.style.width = "45px";
            ticket.style.width = "45px";
            signOut.style.width = "45px";

            home.style.background = "";
            converter.style.background = "";
            ticket.style.background = "";
            signOut.style.background = "";
        }
    };
</script>


<main>
    <nav class="menu" class:active="{ navActive }">
        <button class="menu_Toggle" on:click="{ () => toggleNav()}">{ navActive ? 'X' : '≡'}</button>
<!--        <button class:active={active} on:click="{() => active = !active}">foo</button>-->
        <section class="menu_List">
            <ul class="menu_List">
                <li class="menu_Item">
                    <a id="home" class="menu_home_Link" href="/">
                        <h1 class="homeHeading" id="homeText">Home</h1>
                    </a>
                </li>
                {#if role !== "Client"}
                    <li class="menu_Item">
                        <a id="customer" class="menu_customers_Link" href="/customers">
                            <h1 class="customerHeading" id="customerText">Customer</h1>
                        </a>
                    </li>
                {/if}
                <li class="menu_Item">
                    <a id="converters" class="menu_converters_Link" href="/converters">
                        <h1 class="converterHeading" id="converterText">Converters</h1>
                    </a>
                </li>
                <li class="menu_Item">
                    <a id="tickets" class="menu_tickets_Link" href="/tickets">
                        <h1 class="ticketHeading" id="ticketText">Tickets</h1>
                    </a>
                </li>
                <li class="menu_Item">
                    <a on:click={checkSignOut} id="signOut" class="menu_Link" href="/login">
                        <h1 class="signOutHeading" id="signOutText">Sign out</h1>
                    </a>
                </li>
            </ul>
<!--            <ul class="menu__List">-->
<!--                {#each navOptions as option}-->
<!--                    <li class="menu__Item"><a id={option.listId} class={option.listClass} href={option.link}><h1 class={option.headingClass} id={option.headingId}>{option.optionName}</h1></a></li>-->
<!--                {/each}-->
<!--            </ul>-->
        </section>
    </nav>
    <div class="wrapper" class:active="{ navActive }">
        <svelte:component this={pageBody}/>
    </div>
</main>


<style>
    main {
        font-family: sans-serif;
    }

    .homeHeading {
        color: transparent;
        position: fixed;
        left: 4rem;
        font-size: 20px;
        font-family: Arial,serif ;
    }

    .customerHeading {
        color: transparent;
        position: fixed;
        left: 4rem;
        font-size: 20px;
        text-indent: 0;
        font-family: Arial,serif ;
    }

    .converterHeading {
        color: transparent;
        position: fixed;
        left: 4rem;
        font-size: 20px;
        text-indent: 0;
        font-family: Arial,serif ;
    }

    .ticketHeading {
        color: transparent;
        position: fixed;
        left: 4rem;
        font-size: 20px;
        text-indent: 0;
        font-family: Arial,serif ;
    }

    .signOutHeading {
        color: transparent;
        position: fixed;
        left: 4rem;
        font-size: 20px;
        text-indent: 0;
        font-family: Arial,serif ;
    }

    .menu {
        position: fixed;
        background: black;
        left: 0;
        top: 0;
        bottom: 0;
        overflow: hidden;
        width: 80px;
        transition: 300ms;
    }

    .menu.active {
        width: 250px;
        color: red;
    }

    .menu.active .menu_Link {
        color: white;
    }

    .menu_List {
        all: unset;
        display: block;
        width: 100%;
        z-index: 999;
    }

    .menu_Item {
        display: block;
    }

    .menu_Link {
        display: block;
        width: 50px;
        padding: 5px;
        margin: 15px;
        text-decoration: none;
        white-space: nowrap;
        border-radius: 30px;
        color: transparent;
        transition: 300ms;
    }

    .menu_Link:hover {
        color: orange;
    }

    .menu_Link.active {
        background: #555;
    }

    .menu_Link::before {
        content: attr(title);
        display: inline-block;
        width: 45px;
        height: 45px;
        line-height: 40px;
        text-align: center;
        margin-right: 20px;
        color: orange;
    }

    .menu_Link {
        background: white url("bootstrap-icons/icons/box-arrow-left.svg") no-repeat 50% 50%;
        display: block;
        height: 45px;
        text-indent: -99999em;
        width: 45px;
        overflow: hidden;
    }

    .menu_Toggle {
        all: unset;
        font-size: 25px;
        color: white;
        padding: 15px;
        font-weight: bold;
        background: #373b3e;
        margin: 15px;
        cursor: pointer;
    }

    .wrapper {
        margin-left: 80px;
        transition: 300ms;
    }

    .wrapper.active {
        margin-left: 250px;
    }


    .menu_home_Link {
        display: block;
        padding: 5px;
        margin: 15px;
        text-decoration: none;
        white-space: nowrap;
        border-radius: 30px;
        color: transparent;
        transition: 300ms;
    }

    .menu_home_Link:hover {
        color: orange;
    }

    .menu_home_Link.active {
        background: #555;
    }

    .menu_home_Link::before {
        content: attr(title);
        display: inline-block;
        width: 45px;
        height: 45px;
        line-height: 40px;
        text-align: center;
        margin-right: 20px;
        color: orange;
    }

    .menu_home_Link {
        background: white url("bootstrap-icons/icons/house-door.svg") no-repeat 50% 50%;
        display: block;
        height: 45px;
        /*text-indent: -99999em;*/
        width: 45px;
        overflow: hidden;
    }

    .menu_customers_Link {
        display: block;
        padding: 5px;
        margin: 15px;
        text-decoration: none;
        white-space: nowrap;
        border-radius: 30px;
        color: transparent;
        transition: 300ms;
    }

    .menu_customers_Link:hover {
        color: orange;
    }

    .menu_customers_Link.active {
        background: #555;
    }

    .menu_customers_Link::before {
        content: attr(title);
        display: inline-block;
        width: 45px;
        height: 45px;
        line-height: 40px;
        text-align: center;
        margin-right: 20px;
        color: orange;
    }

    .menu_customers_Link {
        background: white url("bootstrap-icons/icons/people.svg") no-repeat 50% 50%;
        display: block;
        height: 45px;
        text-indent: -99999em;
        width: 45px;
        overflow: hidden;
    }


    .menu_converters_Link {
        display: block;
        padding: 5px;
        margin: 15px;
        text-decoration: none;
        white-space: nowrap;
        border-radius: 30px;
        color: transparent;
        transition: 300ms;
    }

    .menu_converters_Link:hover {
        color: orange;
    }

    .menu_converters_Link.active {
        background: #555;
    }

    .menu_converters_Link::before {
        content: attr(title);
        display: inline-block;
        width: 45px;
        height: 45px;
        line-height: 40px;
        text-align: center;
        margin-right: 20px;
        color: orange;
    }

    .menu_converters_Link {
        background: white url("bootstrap-icons/icons/motherboard.svg") no-repeat 50% 50%;
        display: block;
        height: 45px;
        text-indent: -99999em;
        width: 45px;
        overflow: hidden;
    }

    .menu_tickets_Link {
        display: block;
        padding: 5px;
        margin: 15px;
        text-decoration: none;
        white-space: nowrap;
        border-radius: 30px;
        color: transparent;
        transition: 300ms;
    }

    .menu_tickets_Link:hover {
        color: orange;
    }

    .menu_tickets_Link.active {
        background: #555;
    }

    .menu_tickets_Link::before {
        content: attr(title);
        display: inline-block;
        width: 45px;
        height: 45px;
        line-height: 40px;
        text-align: center;
        margin-right: 20px;
        color: orange;
    }

    .menu_tickets_Link {
        background: white url("bootstrap-icons/icons/ticket-perforated.svg") no-repeat 50% 50%;
        display: block;
        height: 45px;
        text-indent: -99999em;
        width: 45px;
        overflow: hidden;
    }

</style>
