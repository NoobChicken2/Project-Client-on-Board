<script lang="ts">

    export let pageBody

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


        if (navActive) {

            home.style.backgroundPositionX = "9%"
            customer.style.backgroundPositionX = "9%"
            converter.style.backgroundPositionX = "9%"
            ticket.style.backgroundPositionX = "9%"
            signOut.style.backgroundPositionX = "9%"

            home.style.width = "80%";
            customer.style.width = "80%";
            converter.style.width = "80%";
            ticket.style.width = "80%";
            signOut.style.width = "80%";

            homeText.style.color = "black";
            customerText.style.color = "black";
            converterText.style.color = "black";
            ticketText.style.color = "black";
            signOutText.style.color = "black";

            homeText.style.transition = "1000ms";
            customerText.style.transition = "1000ms";
            converterText.style.transition = "1000ms";
            ticketText.style.transition = "1000ms";
            signOutText.style.transition = "1000ms";

        } else {

            homeText.style.transition = "200ms";
            customerText.style.transition = "200ms";
            converterText.style.transition = "200ms";
            ticketText.style.transition = "200ms";
            signOutText.style.transition = "200ms";

            homeText.style.color = "transparent";
            customerText.style.color = "transparent";
            converterText.style.color = "transparent";
            ticketText.style.color = "transparent";
            signOutText.style.color = "transparent";

            home.style.width = "45px";
            customer.style.width = "45px";
            converter.style.width = "45px";
            ticket.style.width = "45px";
            signOut.style.width = "45px";

            home.style.background = "";
            customer.style.background = "";
            converter.style.background = "";
            ticket.style.background = "";
            signOut.style.background = "";
        }
    };

    //Will be used in the future
    export let navOptions = [
        {
            optionName: 'Home',
            listId: 'home',
            listClass: 'menu_home__Link',
            link: '#',
            headingId: 'homeText',
            headingClass: 'homeHeading'
        },
        {
            optionName: 'Customer',
            listId: 'customer',
            listClass: 'menu_customer__Link',
            link: 'http://127.0.0.1:3030/customers',
            headingId: 'customerText',
            headingClass: 'customerHeading'
        },
        {
            optionName: 'Converters',
            listId: 'converters',
            listClass: 'menu_converters__Link',
            link: 'http://127.0.0.1:3030/converters',
            headingId: 'converterText',
            headingClass: 'converterHeading'
        },
        {
            optionName: 'Tickets',
            listId: 'tickets',
            listClass: 'menu_tickets__Link',
            link: 'http://127.0.0.1:3030/tickets',
            headingId: 'ticketText',
            headingClass: 'ticketHeading'
        },
        {
            optionName: 'Sign Out',
            listId: 'signOut',
            listClass: 'menu__Link',
            link: '#',
            headingId: 'signOutText',
            headingClass: 'signOutHeading'
        }
    ]

</script>


<main>
    <nav class="menu" class:active="{ navActive }">
        <button class="menu__Toggle" on:click="{ () => toggleNav()}">{ navActive ? 'X' : '≡'}</button>
<!--        <button class:active={active} on:click="{() => active = !active}">foo</button>-->
        <section class="menu__List">
            <ul class="menu__List">
                <li class="menu__Item">
                    <a id="home" class="menu_home__Link" href="#">
                        <h1 class="homeHeading" id="homeText">
                            Home</h1></a>
                </li>
                <li class="menu__Item">
                    <a id="customer" class="menu_customers_Link" href="/customers">
                        <h1 class="customerHeading" id="customerText">
                            Customer</h1></a></li>
                <li class="menu__Item">
                    <a id="converters" class="menu_converters__Link" href="/converters">
                        <h1 class="converterHeading" id="converterText">
                            Converters</h1></a>
                </li>
                <li class="menu__Item">
                    <a id="tickets" class="menu_tickets__Link" href="/tickets">
                        <h1 class="ticketHeading" id="ticketText">
                            Tickets</h1></a>
                </li>
                <li class="menu__Item">
                    <a id="signOut" class="menu__Link" href="login">
                        <h1 class="signOutHeading" id="signOutText">
                            Sign out</h1></a>
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
        top: 123px;
        left: 4rem;
        font-size: 20px;
        transition: 1000ms;
        font-family: Arial,serif ;
    }

    .customerHeading {
        color: transparent;
        position: fixed;
        top: 183px;
        left: 4rem;
        font-size: 20px;
        text-indent: 0;
        transition: 1000ms;
        font-family: Arial,serif ;
    }

    .converterHeading {
        color: transparent;
        position: fixed;
        top: 243px;
        left: 4rem;
        font-size: 20px;
        text-indent: 0;
        transition: 1000ms;
        font-family: Arial,serif ;
    }

    .ticketHeading {
        color: transparent;
        position: fixed;
        top: 303px;
        left: 4rem;
        font-size: 20px;
        text-indent: 0;
        transition: 1000ms;
        font-family: Arial,serif ;
    }

    .signOutHeading {
        color: transparent;
        position: fixed;
        top: 363px;
        left: 4rem;
        font-size: 20px;
        text-indent: 0;
        transition: 1000ms;
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

    .menu.active .menu__Link {
        color: white;
    }

    .menu__List {
        all: unset;
        display: block;
        width: 100%;
        z-index: 999;
    }

    .menu__Item {
        display: block;
    }

    .menu__Link {
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

    .menu__Link:hover {
        color: orange;
    }

    .menu__Link.active {
        background: #555;
    }

    .menu__Link::before {
        content: attr(title);
        display: inline-block;
        width: 45px;
        height: 45px;
        line-height: 40px;
        text-align: center;
        margin-right: 20px;
        color: orange;
    }

    .menu__Link {
        background: white url("bootstrap-icons/icons/box-arrow-left.svg") no-repeat 50% 50%;
        display: block;
        height: 45px;
        text-indent: -99999em;
        width: 45px;
        overflow: hidden;
    }

    .menu__Toggle {
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


    .menu_home__Link {
        display: block;
        padding: 5px;
        margin: 15px;
        text-decoration: none;
        white-space: nowrap;
        border-radius: 30px;
        color: transparent;
        transition: 300ms;
    }

    .menu_home__Link:hover {
        color: orange;
    }

    .menu_home__Link.active {
        background: #555;
    }

    .menu_home__Link::before {
        content: attr(title);
        display: inline-block;
        width: 45px;
        height: 45px;
        line-height: 40px;
        text-align: center;
        margin-right: 20px;
        color: orange;
    }

    .menu_home__Link {
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


    .menu_converters__Link {
        display: block;
        padding: 5px;
        margin: 15px;
        text-decoration: none;
        white-space: nowrap;
        border-radius: 30px;
        color: transparent;
        transition: 300ms;
    }

    .menu_converters__Link:hover {
        color: orange;
    }

    .menu_converters__Link.active {
        background: #555;
    }

    .menu_converters__Link::before {
        content: attr(title);
        display: inline-block;
        width: 45px;
        height: 45px;
        line-height: 40px;
        text-align: center;
        margin-right: 20px;
        color: orange;
    }

    .menu_converters__Link {
        background: white url("bootstrap-icons/icons/motherboard.svg") no-repeat 50% 50%;
        display: block;
        height: 45px;
        text-indent: -99999em;
        width: 45px;
        overflow: hidden;
    }

    .menu_tickets__Link {
        display: block;
        padding: 5px;
        margin: 15px;
        text-decoration: none;
        white-space: nowrap;
        border-radius: 30px;
        color: transparent;
        transition: 300ms;
    }

    .menu_tickets__Link:hover {
        color: orange;
    }

    .menu_tickets__Link.active {
        background: #555;
    }

    .menu_tickets__Link::before {
        content: attr(title);
        display: inline-block;
        width: 45px;
        height: 45px;
        line-height: 40px;
        text-align: center;
        margin-right: 20px;
        color: orange;
    }

    .menu_tickets__Link {
        background: white url("bootstrap-icons/icons/ticket-perforated.svg") no-repeat 50% 50%;
        display: block;
        height: 45px;
        text-indent: -99999em;
        width: 45px;
        overflow: hidden;
    }

</style>
