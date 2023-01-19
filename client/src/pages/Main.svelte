<script>
    import Header from "../components/Header.svelte";
    import MenuCard from "../components/MenuCard.svelte";
    import {clientCards, globalAdminsCards, companyAdminsCards} from "../assets/CardData.ts";

    let username = localStorage.getItem('username');
    let role = localStorage.getItem('role');

    let currentCards;

    switch (role) {
        case "Client":
            currentCards = clientCards;
            break;
        case "CompanyAdmin":
            currentCards = companyAdminsCards;
            break;
        case "GlobalAdmin":
            currentCards = globalAdminsCards;
            break;
    }

</script>

<Header username={username}/>
<div class="container bg-light mt-4 px-5" id="cardContainer">
        <div class="row row-cols-1 row-cols-md-4">
            {#each currentCards as card}
                <div class="col mt-5 d-flex justify-content-center mx-auto">
                    <MenuCard img={card.img} cardTitle={card.cardTitle} cardText={card.cardText} link={card.link}/>
                </div>
            {/each}
        </div>
</div>

<style>
    #cardContainer {
        height: 590px;
    }
</style>