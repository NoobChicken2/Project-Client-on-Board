<script>

    import {logIn} from "../scripts/customerScript.ts";
    import {token, role} from "../stores/store.ts";
    import {handleToken} from "../scripts/logInScript.ts";
    import router from "page";

    let username = '';
    let password = '';
    let error;
    let message;

    function clickHandler(){
        error = undefined
        message = undefined

        logIn(username,password).then((response) => {

            if (response.error !== undefined){
                error = response.error;
            } else {
                message = "Logged in";
                handleToken(response)
                router("/main");
            }
        });

    }


</script>


<body class="login-body">

    <div class="login">
           <div class="image">

           </div>
        <form class="needs-validation">
            <div class="form-group was-validated">
                <label class="form-label" for="username">Username</label>
                <input class="form-control" type="text" id="username"  bind:value={username} required>
                <div class="invalid-feedback">
                    Please enter your username
                </div>
            </div>

            <div class="form-group was-validated">
                <label class="form-label" for="password">Password</label>
                <input class="form-control" type="password" id="password" bind:value={password} required>
                <div class="invalid-feedback" >
                    Please enter your password
                </div>
            </div>
            <input  class="btn btn-primary" value="Log In" on:click={clickHandler}>
            {#if error}
                <p>{error}</p>
            {/if}

            {#if message}
                <p> {message} </p>
            {/if}
        </form>
    </div>

</body>

<style>
    .image{
        background: url("../lib/Image 5.svg")no-repeat  center;
        height: 350px;

    }
    .login-body{
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: cadetblue;
    }
    .login{
        width: 400px;
        height: min-content;
        padding: 20px;
        border-radius: 12px;
        background-color: white;

    }
    .login form{
        font-size: 20px;
    }
    .login form .form-group{
        margin-bottom: 12px;
    }
    .login form input[type="submit"]{
        font-size: 20px;
        margin-top: 15px;
    }
    body{
        background: url("../lib/Image 4.svg") no-repeat fixed center;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        overflow-x: hidden;
        height: 100vh;
    }
</style>