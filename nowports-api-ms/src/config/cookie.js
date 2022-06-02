module.exports = {
    secret: process.env.COOKIE_SECRET || "wUH5rUllWZxtWFCnJi7kmb9xPTePXe9Fbb1f7tl5SarPhVmsdwJFujJj5A9jJAl",
    cookieConfig: {
        /*
        |--------------------------------------------------------------------------
        | HTTP Access Only
        |--------------------------------------------------------------------------
        | Establecer este valor en true impedirá que JavaScript acceda a el
        | valor de la cookie y la cookie sólo será accesible a través de
        | el protocolo HTTP. Usted es libre de modificar esta opción si es necesario.
        */
        httpOnly: process.env.COOKIE_HTTP_ONLY || true,

        /*
        |--------------------------------------------------------------------------
        | Duración de la sesión
        |--------------------------------------------------------------------------
        | Aquí puede especificar el número de milisegundos que desea para la sesión.
        | 1 minuto = 60000
        | Por defecto la sesión se establece en 20 minutos.
        */
        maxAge: process.env.COOKIE_MAX_AGE || 1200000,

        /*
        |--------------------------------------------------------------------------
        | Cifrado de sesión
        |--------------------------------------------------------------------------
        | Esta opción le permite especificar fácilmente que todos los datos de la sesión
        | debe cifrarse antes de que se almacene.
        | El cifrado se ejecutará automáticamente por NOWPORTS y se puede utilizar la sesión como normal.
        */
        signed: process.env.COOKIE_SIGNED || true
    },
    name: process.env.COOKIE_NAME || "SESSION_TOKEN"
}