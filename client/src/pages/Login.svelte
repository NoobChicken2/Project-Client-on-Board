<script>

    let email = '';
    let password = '';

</script>


<body class="login-body">

    <div class="login">
        <form class="needs-validation">
            <div class="form-group was-validated">
                <label class="form-label" for="email">Email</label>
                <input class="form-control" type="email" id="email" required>
                <div class="invalid-feedback">
                    Please enter your email
                </div>
            </div>

            <div class="form-group was-validated">
                <label class="form-label" for="password">Password</label>
                <input class="form-control" type="password" id="password" required>
                <div class="invalid-feedback" >
                    Please enter your password
                </div>
            </div>
            <input  class="btn btn-primary" type="submit" value="Login">
        </form>
    </div>
</body>

<style>

    .login-body{
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: cadetblue;
    }
    .login{
        width: 360px;
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
</style>