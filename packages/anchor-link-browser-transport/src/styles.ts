export default `
/* Anchor Link Modal */

.%prefix% * {
    box-sizing: border-box;
    line-height: 1;
}

.%prefix% {
    font-family: CircularStd, -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
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
    background: rgb(54, 80, 162);
    color: white;
    margin: 20px;
    border-radius: 20px;
    box-shadow: 0px 4px 100px rgba(0, 0, 0, .5);
    width: 360px;
    transition-property: all;
    transition-duration: .5s;
    transition-timing-function: ease-in-out;
    position: relative;
}

.%prefix%-nav {
    height: 55px;
    display: flex;
    border-radius: 20px 20px 0px 0px;
    justify-content: space-between;
    align-items: center;
    padding: 0px 16px;
    background-color: rgba(0,0,0,0.2);
}

.%prefix%-back {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg%3E%3Cg%3E%3Cpath d='M0 0L24 0 24 24 0 24z' transform='translate(-348 -152) translate(348 152)'/%3E%3Cpath fill='rgba(255,255,255, 0.8)' fill-rule='nonzero' d='M16.41 5.791L14.619 4 7 11.619 14.619 19.239 16.41 17.448 10.594 11.619z' transform='translate(-348 -152) translate(348 152)'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
    background-size: 22px;
    background-repeat: no-repeat;
    background-position: 50%;
    cursor: pointer;
    width: 16px;
    height: 16px;
}

.%prefix%-back:hover {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg%3E%3Cg%3E%3Cpath d='M0 0L24 0 24 24 0 24z' transform='translate(-348 -152) translate(348 152)'/%3E%3Cpath fill='rgba(255,255,255,1)' fill-rule='nonzero' d='M16.41 5.791L14.619 4 7 11.619 14.619 19.239 16.41 17.448 10.594 11.619z' transform='translate(-348 -152) translate(348 152)'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
}

.%prefix%-header {
    font-family: CircularStd-Book;
    font-size: 16px;
    line-height: 24px;
}

.%prefix%-close {
    width: 16px;
    height: 16px;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.66 10.987L6 7.327l-3.66 3.66A1.035 1.035 0 11.876 9.523l3.66-3.66-3.66-3.66A1.035 1.035 0 012.34.737L6 4.398 9.66.739a1.035 1.035 0 111.464 1.464l-3.66 3.66 3.66 3.661a1.035 1.035 0 11-1.464 1.464z' fill='rgba(255,255,255, 0.8)' fill-rule='nonzero'/%3E%3C/svg%3E");
    background-size: 14px;
    background-repeat: no-repeat;
    background-position: 50%;
    border-radius: 100%;
    cursor: pointer;
}

.%prefix%-close:hover {
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.66 10.987L6 7.327l-3.66 3.66A1.035 1.035 0 11.876 9.523l3.66-3.66-3.66-3.66A1.035 1.035 0 012.34.737L6 4.398 9.66.739a1.035 1.035 0 111.464 1.464l-3.66 3.66 3.66 3.661a1.035 1.035 0 11-1.464 1.464z' fill='rgba(255,255,255,1)' fill-rule='nonzero'/%3E%3C/svg%3E");
}

.%prefix%-logo {
    width: 100%;
    height: 50px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23fff' d='M18.81 9.19h33.25V59.5H18.81z'/%3E%3Cpath d='M38.45 28.88h-6.9L35 21.77l3.45 7.1z' fill='%233650A2'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M35 70a35 35 0 100-70 35 35 0 000 70zm2.36-55.4a2.62 2.62 0 00-4.72 0L21.9 36.75h5.84l1.7-3.5h11.13l1.7 3.5h5.83L37.36 14.6zM48.13 44.2h-5.26a7.76 7.76 0 01-5.24 7v-10.5a2.62 2.62 0 10-5.25 0v10.5a7.76 7.76 0 01-5.25-7h-5.25c.16 7.06 6 12.69 13.12 12.69 7.12 0 12.97-5.63 13.13-12.7z' fill='%233650A2'/%3E%3C/svg%3E");
    background-position: 50%;
    background-repeat: no-repeat;
    margin-bottom: 20px;
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
    padding: 20px 55px 40px 55px;
    border-radius: 20px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.%prefix%-separator {
    margin-top: 20px;
    width: 100%;
    font-size: 12px;
    display: flex;
    align-items: center;
    text-align: center;
    color: white;
}

.%prefix%-separator::before,
.%prefix%-separator::after {
    content: '';
    flex: 1;
    opacity: 0.2;
    border-bottom: 1px solid #d8d8d8;
}

.%prefix%-separator::before {
    margin-right: .5em;
}

.%prefix%-separator::after {
    margin-left: .5em;
}

.%prefix%-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.%prefix%-uri {
    width: 100%;
    padding: 20px 4px 0px 4px;
}

.%prefix%-background {
    width: 250px;
    height: 250px;
    border-radius: 10px;
    box-shadow: 0 4px 8px -2px rgba(141, 141, 148, 0.28), 0 0 2px 0 rgba(141, 141, 148, 0.16);
    background-color: #ffffff;
    position: relative;
    z-index: 10;
}

.%prefix%-qr {
    width: 210px;
    position: absolute;
    z-index: 5;
    top: 20px;
    left: 20px;
}

.%prefix%-qr svg {
    width: 100%;
    fill: #010c2c;
}

.%prefix%-footnote {
    font-family: CircularStd-Book;
    font-size: 16px;
    text-align: center;
    width: 100%;
    position: absolute;
    bottom: -30px;
    left: 0;
    color: white;
}

.%prefix%-footnote a {
    color: white;
}

.%prefix%-wskeepalive {
    display: none;
}

.%prefix%-uri a {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    font-family: CircularStd;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    color: #ffffff;
    text-decoration: none;
    flex-grow: 1;
    flex: 1;
    padding: 18px 0px 16px 0px;
    display: block;
}

.%prefix%-uri a:hover {
    background-color: rgba(255, 255, 255, 0.25);
    transition: 0.2s ease;
}
`
