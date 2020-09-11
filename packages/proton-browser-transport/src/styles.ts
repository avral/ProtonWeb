export default `
/* Anchor Link */

.%prefix% * {
    box-sizing: border-box;
    line-height: 1;
}

.%prefix% {
    font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
        Arial, sans-serif;
    font-size: 13px;
    background: rgba(0, 0, 0, 0.65);
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 2147483647;
    display: none;
    align-items: center;
    justify-content: center;
}

.%prefix%-active {
    display: flex;
}

.%prefix%-inner {
    background: #EFF1F7;
    margin: 20px;
    padding-top: 50px;
    border-radius: 20px;
    box-shadow: 0px 4px 100px rgba(0, 0, 0, .5);
    width: 340px;
    transition-property: all;
    transition-duration: .5s;
    transition-timing-function: ease-in-out;
    position: relative;
}

.%prefix%-close {
    display: block;
    position: absolute;
    top: 16px;
    right: 16px;
    width: 28px;
    height: 28px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M.57 12.1a.96.96 0 000 1.34c.37.36 1 .36 1.34 0L7 8.37l5.09 5.09c.36.35.97.35 1.34-.01a.96.96 0 000-1.34L8.34 7.01l5.08-5.08a.95.95 0 000-1.33.97.97 0 00-1.34-.01L6.99 5.68 1.91.59a.96.96 0 00-1.33 0 .97.97 0 00-.01 1.34l5.09 5.08-5.1 5.1z' fill='%23007AFF'/%3E%3C/svg%3E");
    background-size: 14px;
    background-repeat: no-repeat;
    background-position: 50%;
    border-radius: 100%;
    cursor: pointer;
    background-color: rgb(194, 162, 246, 0.2);
    transition: background-color 0.2s ease;
}

.%prefix%-close:hover {
    background-color: rgb(194, 162, 246, 0.3);
    transition: background-color 0.2s ease;
}

.%prefix%-logo {
    width: 64px;
    height: 64px;
    margin: 0 auto;
    margin-top: -38px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='2f3bgpxsia' x1='4.068%' x2='97.224%' y1='97.082%' y2='127.413%'%3E%3Cstop offset='0%' stop-color='%237543E3'/%3E%3Cstop offset='100%' stop-color='%23582ACB'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill-rule='nonzero'%3E%3Cg transform='translate(-128 -32) translate(128 32)'%3E%3Ccircle cx='32' cy='32' r='32' fill='url(%232f3bgpxsia)'/%3E%3Cpath fill='%23FFF' d='M32.002 8c3.164 0 5.894 3.261 7.692 8.56-.726.202-1.468.425-2.217.675-1.493-4.384-3.543-6.963-5.475-6.963-2.177 0-4.5 3.271-6.013 8.71.591.189 1.188.39 1.796.613 1.373.501 2.788 1.09 4.232 1.76.082-.037.164-.078.247-.115.925-.422 1.843-.812 2.752-1.168l.327-.127c2.723-1.045 5.354-1.795 7.763-2.19 5.188-.857 8.836.029 10.268 2.495 1.435 2.466.385 6.045-2.955 10.076-.193.23-.389.464-.595.694-.497-.548-1.027-1.097-1.592-1.645 2.948-3.394 4.109-6.36 3.161-7.99-.896-1.54-3.85-2.06-7.91-1.391-.868.143-1.77.337-2.696.576.132.604.256 1.22.365 1.857.25 1.428.444 2.939.581 4.512.714.498 1.41 1.003 2.08 1.518 2.621 2.015 4.873 4.127 6.606 6.217 3.34 4.03 4.39 7.61 2.955 10.076-1.076 1.853-3.403 2.813-6.695 2.813-1.088 0-2.282-.103-3.573-.318-.333-.055-.673-.116-1.016-.185.206-.704.396-1.44.568-2.203.278.055.553.104.824.15 4.057.668 7.015.149 7.911-1.393 1.089-1.872-.612-5.515-4.61-9.542-.4.362-.81.722-1.235 1.08-.062.051-.127.106-.19.155-1.13.94-2.346 1.865-3.63 2.76-.062.713-.132 1.418-.217 2.101C40.262 50.15 36.59 57 32.002 57c-3.157 0-5.884-3.252-7.681-8.538.722-.194 1.46-.422 2.216-.675 1.494 4.371 3.537 6.941 5.465 6.941 2.178 0 4.506-3.282 6.021-8.735-.594-.188-1.193-.388-1.797-.61-1.382-.5-2.791-1.083-4.211-1.736l-.091.042c-.801.37-1.589.714-2.367 1.032-.12.048-.238.097-.356.14-4.478 1.79-8.568 2.719-11.82 2.719-3.24 0-5.642-.922-6.753-2.83-1.589-2.732-.085-6.733 3.677-10.952l1.598 1.674c-3.043 3.46-4.252 6.49-3.291 8.142 1.087 1.87 5.102 2.232 10.603.814-.13-.602-.253-1.216-.362-1.852-.248-1.426-.441-2.933-.58-4.502-.716-.498-1.413-1-2.074-1.505C13.824 31.702 10 26.532 10 22.684c0-.89.206-1.707.628-2.434 1.582-2.716 5.782-3.433 11.297-2.336-.21.713-.403 1.46-.576 2.232-4.534-.889-7.78-.412-8.737 1.24-1.087 1.87.606 5.504 4.592 9.526.511-.461 1.042-.918 1.599-1.371 1.074-.882 2.236-1.757 3.473-2.618.063-.714.134-1.42.22-2.104C23.747 14.847 27.42 8 32.003 8zm7.24 31.713c-.55.346-1.107.689-1.676 1.023-.193.113-.386.224-.579.334-.676.386-1.353.76-2.023 1.11-.1.053-.198.101-.297.153.695.292 1.386.565 2.068.817.617.228 1.226.437 1.83.633.133-.622.258-1.264.37-1.928.117-.688.216-1.409.308-2.142zm-14.487-.003c.096.77.206 1.518.33 2.24.108.631.23 1.238.358 1.83.37-.118.744-.243 1.123-.377.115-.039.232-.08.347-.123.781-.28 1.582-.587 2.399-.935.008-.002.015-.006.023-.009-.774-.402-1.547-.825-2.318-1.266-.039-.023-.081-.045-.12-.071-.736-.423-1.447-.854-2.142-1.289zm7.248-15.839c-.782.379-1.567.775-2.351 1.198-.497.266-.994.542-1.49.827-1.303.746-2.529 1.513-3.686 2.288-.047.662-.087 1.332-.113 2.022-.03.75-.042 1.515-.042 2.294 0 1.494.055 2.931.153 4.314.668.448 1.355.893 2.073 1.33.526.324 1.062.645 1.614.96 1.28.733 2.565 1.407 3.844 2.024.082-.04.163-.076.246-.116.85-.416 1.71-.863 2.582-1.344.337-.181.673-.37 1.01-.564 1.302-.746 2.529-1.512 3.685-2.287.047-.663.088-1.334.113-2.023.03-.75.043-1.515.043-2.294 0-1.493-.055-2.93-.154-4.313-.666-.447-1.351-.891-2.069-1.33-.526-.325-1.066-.643-1.618-.96-1.302-.747-2.584-1.419-3.84-2.026zM32 30c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm9.92-.117c.034.857.052 1.73.052 2.617 0 .214 0 .428-.003.643-.007.67-.027 1.33-.053 1.984.589-.443 1.154-.886 1.694-1.329.068-.055.134-.107.2-.162.457-.38.894-.759 1.315-1.136-.386-.345-.785-.692-1.201-1.038-.631-.53-1.303-1.055-2.003-1.58zm-19.831-.006c-.53.397-1.041.794-1.53 1.192-.59.475-1.15.954-1.681 1.432.386.346.786.693 1.203 1.04.631.527 1.303 1.052 2.003 1.576-.034-.857-.052-1.73-.052-2.617 0-.214 0-.428.007-.64.005-.67.024-1.329.05-1.983zm16.472-8.659c-.305.099-.611.2-.92.307-.909.312-1.83.666-2.765 1.055-.067.027-.133.057-.2.085.766.4 1.537.821 2.311 1.265.04.023.082.045.121.071.731.418 1.442.852 2.142 1.291-.096-.77-.206-1.519-.331-2.242-.11-.63-.23-1.238-.358-1.832zm-13.12 0c-.133.62-.256 1.261-.369 1.923-.118.69-.219 1.408-.31 2.14.697-.437 1.414-.869 2.15-1.293l.105-.058c.772-.442 1.547-.863 2.321-1.265-.701-.295-1.39-.567-2.065-.815-.625-.234-1.233-.44-1.832-.631z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.%prefix%-logo.loading {
    border-radius: 100%;
    background-color: #3650A2;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0.5 0.5 45 45' xmlns='http://www.w3.org/2000/svg' stroke='%23fff'%3E%3Cg fill='none' fill-rule='evenodd' transform='translate(1 1)' stroke-width='2'%3E%3Ccircle cx='22' cy='22' r='6' stroke-opacity='0'%3E%3Canimate attributeName='r' begin='1.5s' dur='3s' values='6;22' calcMode='linear' repeatCount='indefinite' /%3E%3Canimate attributeName='stroke-opacity' begin='1.5s' dur='3s' values='1;0' calcMode='linear' repeatCount='indefinite' /%3E%3Canimate attributeName='stroke-width' begin='1.5s' dur='3s' values='2;0' calcMode='linear' repeatCount='indefinite' /%3E%3C/circle%3E%3Ccircle cx='22' cy='22' r='6' stroke-opacity='0'%3E%3Canimate attributeName='r' begin='3s' dur='3s' values='6;22' calcMode='linear' repeatCount='indefinite' /%3E%3Canimate attributeName='stroke-opacity' begin='3s' dur='3s' values='1;0' calcMode='linear' repeatCount='indefinite' /%3E%3Canimate attributeName='stroke-width' begin='3s' dur='3s' values='2;0' calcMode='linear' repeatCount='indefinite' /%3E%3C/circle%3E%3Ccircle cx='22' cy='22' r='8'%3E%3Canimate attributeName='r' begin='0s' dur='1.5s' values='6;1;2;3;4;5;6' calcMode='linear' repeatCount='indefinite' /%3E%3C/circle%3E%3C/g%3E%3C/svg%3E");
}

.%prefix%-logo.error {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 70 70'%3E%3Cdefs/%3E%3Ccircle cx='35' cy='35' r='35' fill='%23FC3D39'/%3E%3Cpath fill='%23fff' d='M22.3 48h25.4c2.5 0 4-1.7 4-4a4 4 0 00-.5-2L38.5 19.3a4 4 0 00-3.5-2 4 4 0 00-3.5 2L18.8 42.1c-.3.6-.5 1.3-.5 2 0 2.2 1.6 4 4 4zM35 37c-.9 0-1.4-.6-1.4-1.5l-.2-7.7c0-.9.6-1.6 1.6-1.6s1.7.7 1.7 1.6l-.3 7.7c0 1-.5 1.5-1.4 1.5zm0 6c-1 0-1.9-.8-1.9-1.8s.9-1.8 2-1.8c1 0 1.8.7 1.8 1.8 0 1-.9 1.8-1.9 1.8z'/%3E%3C/svg%3E");
}

.%prefix%-logo.success {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 70 70'%3E%3Cdefs/%3E%3Ccircle cx='35' cy='35' r='35' fill='%233DC55D'/%3E%3Cpath fill='%23fff' d='M30.9 49.7a2 2 0 001.8-1L48 24.9c.3-.5.4-1 .4-1.4 0-1-.7-1.7-1.7-1.7-.8 0-1.2.3-1.6 1L30.8 45.4 23.5 36c-.5-.6-1-.9-1.6-.9-1 0-1.8.8-1.8 1.8 0 .4.2.9.6 1.3L29 48.7c.6.7 1.1 1 1.9 1z'/%3E%3C/svg%3E");
}

.%prefix%-request {
    padding: 20px 20px 40px 20px;
    border-radius: 20px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    background: white;
}

.%prefix%-info {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.%prefix%-title {
    margin-top: 8px;
    font-weight: bold;
    width: 320px;
    height: 40px;
    font-family: CircularStd;
    font-size: 21px;
    line-height: 1.9;
    text-align: center;
    color: #ffffff;
}

.%prefix%-subtitle {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.71;
    letter-spacing: normal;
    text-align: center;
    color: #c2a2f6;
    width: 320px;
    height: 24px;
    font-family: CircularStd;
    margin-bottom: 24px;
}

.%prefix%-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.%prefix%-uri {
    width: 100%;
}

.%prefix%-background {
    width: 240px;
    height: 240px;
    border-radius: 10px;
    box-shadow: 0 4px 8px -2px rgba(141, 141, 148, 0.28), 0 0 2px 0 rgba(141, 141, 148, 0.16);
    background-color: #ffffff;
    position: relative;
}

.%prefix%-qr {
    width: 200px;
    position: absolute;
    z-index: 5;
    top: 20px;
    left: 20px;
}

.%prefix%-qr svg {
    width: 100%;
}

.%prefix%-footnote {
    text-align: center;
    width: 100%;
    position: absolute;
    bottom: -26px;
    left: 0;
    color: white;
}

.%prefix%-footnote a {
    color: white;
}

.%prefix%-wskeepalive {
    display: none;
}



@media (prefers-color-scheme: dark) {
    .%prefix%-inner {
        background: #010c2c;
        color: white;
    }
    .%prefix%-request {
        background: #010c2c;
    }
    .%prefix%-title {
        color: #FFFFFF;
    }
    .%prefix%-subtitle {
        color: ##c2a2f6;
    }
    .%prefix%-qr svg path {
        fill: #010c2c;
    }
    .%prefix%-qr svg path:last-child {
        stroke: white;
    }
    .%prefix%-uri a {
        color: #FCFCFC;
        background: #262D43;
    }
    .%prefix%-close {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M.57 12.1a.96.96 0 000 1.34c.37.36 1 .36 1.34 0L7 8.37l5.09 5.09c.36.35.97.35 1.34-.01a.96.96 0 000-1.34L8.34 7.01l5.08-5.08a.95.95 0 000-1.33.97.97 0 00-1.34-.01L6.99 5.68 1.91.59a.96.96 0 00-1.33 0 .97.97 0 00-.01 1.34l5.09 5.08-5.1 5.1z' fill='%23FCFCFC'/%3E%3C/svg%3E");
    }
}
`
