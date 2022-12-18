<script lang="ts">

    let navActive = false;
    const toggleNav = () => {
        navActive = !navActive;

        let home = document.getElementById("home");
        let customer = document.getElementById("customer");
        let converter = document.getElementById("converters");
        let signOut = document.getElementById("signOut");

        let homeText = document.getElementById("homeText");
        let customerText = document.getElementById("customerText");
        let converterText = document.getElementById("converterText");
        let signOutText = document.getElementById("signOutText");


        if (navActive) {

            home.style.backgroundPositionX = "6%"
            customer.style.backgroundPositionX = "6%"
            converter.style.backgroundPositionX = "6%"
            signOut.style.backgroundPositionX = "6%"

            home.style.width = "80%";
            customer.style.width = "80%";
            converter.style.width = "80%";
            signOut.style.width = "80%";

            homeText.style.color = "black";
            customerText.style.color = "black";
            converterText.style.color = "black";
            signOutText.style.color = "black";

            homeText.style.transition = "1000ms";
            customerText.style.transition = "1000ms";
            converterText.style.transition = "1000ms";
            signOutText.style.transition = "1000ms";

        } else {

            homeText.style.transition = "200ms";
            customerText.style.transition = "200ms";
            converterText.style.transition = "200ms";
            signOutText.style.transition = "200ms";

            homeText.style.color = "transparent";
            customerText.style.color = "transparent";
            converterText.style.color = "transparent";
            signOutText.style.color = "transparent";



            home.style.width = "30px";
            customer.style.width = "30px";
            converter.style.width = "30px";
            signOut.style.width = "30px";


            home.style.background = "";
            customer.style.background = "";
            converter.style.background = "";
            signOut.style.background = "";
        }
    };
</script>


<main>
    <nav class="menu" class:active="{ navActive }">
        <button class="menu__Toggle" on:click="{ () => toggleNav() }">{ navActive ? 'X' : '≡'}</button>
        <ul class="menu__List">
            <li class="menu__Item"><a id="home" class="menu_home__Link" href="#"><h1 class="homeHeading" id="homeText">
                Home</h1></a>
            </li>
            <li class="menu__Item"><a id="customer" class="menu_customers_Link" href="#"><h1 class="customerHeading"
                                                                                             id="customerText">
                Customer</h1></a></li>
            <li class="menu__Item"><a id="converters" class="menu_converters__Link" href="http://127.0.0.1:3030/converterstatus"><h1
                    class="converterHeading" id="converterText">Converters</h1></a>
            </li>
            <li class="menu__Item"><a id="signOut" class="menu__Link" href="#"><h1 class="signOutHeading"
                                                                                   id="signOutText">Sign out</h1></a>
            </li>
        </ul>
    </nav>
    <div class="wrapper" class:active="{ navActive }">
<!--        <h1>Content</h1>-->
    </div>
</main>

<style>
    main {
        font-family: sans-serif;
    }

    .homeHeading {
        color: transparent;
        position: fixed;
        top: 6.4rem;
        left: 5rem;
        font-size: 20px;
        transition: 1000ms;
        font-family: Arial,serif ;
    }

    .customerHeading {
        color: transparent;
        position: fixed;
        top: 9.8rem;
        left: 5rem;
        font-size: 20px;
        text-indent: 0;
        transition: 1000ms;
        font-family: Arial,serif ;
    }

    .converterHeading {
        color: transparent;
        position: fixed;
        top: 13.3rem;;
        left: 5rem;
        font-size: 20px;
        text-indent: 0;
        transition: 1000ms;
        font-family: Arial,serif ;
    }

    .signOutHeading {
        color: transparent;
        position: fixed;
        top: 16.7rem;
        left: 5rem;
        font-size: 20px;
        text-indent: 0;
        transition: 1000ms;
        font-family: Arial,serif ;
    }

    .menu {
        position: fixed;
        background: #151515;
        left: 0;
        top: 0;
        bottom: 0;
        overflow: hidden;
        width: 80px;
        transition: 300ms;
    }

    .menu.active {
        width: 250px;
    }

    .menu.active .menu__Link {
        color: white;
    }

    .menu__List {
        all: unset;
        display: block;
        width: 100%;
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
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin-right: 20px;
        color: orange;
    }

    .menu__Link {
        background: white url("bootstrap-icons/icons/box-arrow-left.svg") no-repeat 50% 50%;
        display: block;
        height: 30px;
        text-indent: -99999em;
        width: 30px;
        overflow: hidden;
    }

    .menu__Toggle {
        all: unset;
        font-size: 14px;
        color: #e7e7e7;
        padding: 15px;
        font-weight: bold;
        background: #333;
        margin: 20px;
        cursor: pointer;
    }

    .wrapper {
        margin-left: 80px;
        padding-left: 40px;
        transition: 300ms;
    }

    .wrapper.active {
        margin-left: 400px;
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
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin-right: 20px;
        color: orange;
    }

    .menu_home__Link {
        background: white url("bootstrap-icons/icons/house-door.svg") no-repeat 50% 50%;
        display: block;
        height: 30px;
        /*text-indent: -99999em;*/
        width: 30px;
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
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin-right: 20px;
        color: orange;
    }

    .menu_customers_Link {
        background: white url("bootstrap-icons/icons/people.svg") no-repeat 50% 50%;
        display: block;
        height: 30px;
        text-indent: -99999em;
        width: 30px;
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
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin-right: 20px;
        color: orange;
    }

    .menu_converters__Link {
        background: white url("bootstrap-icons/icons/motherboard.svg") no-repeat 50% 50%;
        display: block;
        height: 30px;
        text-indent: -99999em;
        width: 30px;
        overflow: hidden;
    }
</style>
