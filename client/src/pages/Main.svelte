<script>
    import Header from "../components/Header.svelte";
    import MenuCard from "../components/MenuCard.svelte";
    import {clientCards, companyAdminCards, globalAdminCards} from "../assets/CardData.ts";

    let username = localStorage.getItem('username');
    let role = localStorage.getItem('role');

    let currentCards;

    switch (role) {
        case "Client":
            currentCards = clientCards;
            break;
        case "CompanyAdmin":
            currentCards = companyAdminCards;
            break;
        case "GlobalAdmin":
            currentCards = globalAdminCards;
            break;
    }

</script>

<body>
    <Header username={username}/>
    <div class="container mt-5 px-5 pt-3" id="cardContainer">
        <div class="row row-cols-1 row-cols-md-4">
            {#each currentCards as card}
                <div class="col mt-5 d-flex justify-content-center mx-auto">
                    <MenuCard img={card.img} cardTitle={card.cardTitle} link={card.link}/>
                </div>
            {/each}
        </div>
    </div>
</body>

<style>

    body {
        background: url("../lib/Image 2.svg") no-repeat fixed center;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        overflow-x: hidden;
        height: 100vh;
    }

</style>