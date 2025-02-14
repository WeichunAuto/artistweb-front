// const devBaseUrl = 'http://192.168.18.41:8080/users/'
// const devBaseUrl = 'http://localhost:8080/users/'
const devBaseUrl = 'http://54.79.28.228:8080/users/'

const productBaseUrl = 'http://54.79.28.228:8080/users/'

// website related colors
export const Color = {
    textMain: 'text-orange-500',
    textBody: 'text-gray-600',
    textButton: 'text-white',
    btnBg: 'bg-orange-500 hover:bg-fuchsia-500',
    }

// Restful API related while using axios.
 export const ApiCon = {
        BASE_RUL: process.env.NODE_ENV === 'development' ? devBaseUrl : productBaseUrl,
        TIMEOUT: 15000
    }

// Authorized app account.
export const App = {
    appName: 'users',
    appKey: '7dfb4cf67742cb0660305e56ef816c53fcec892cae7f6ee39b75f34e659d672c'
}


