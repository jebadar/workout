
let env = "local";
let API_URL;
let ASSET_URL;
let MEDIA_URL;
let STORAGE_URL;

if(window.location.hostname.indexOf("wpro.")>-1){
    env="prod";
} else if (window.location.hostname.indexOf("wpro-stage.")>-1){
    env="stage";
} 

if(env=="prod"){
    API_URL="https://wpro.vqode.com/public/";
    ASSET_URL="https://wpro.vqode.com/app/assets/";
    MEDIA_URL="https://wpro.vqode.com/public/media";
    STORAGE_URL="https://wpro.vqode.com/storage/app/";
} else{
    API_URL="https://wpro-stage.vqode.com/public/";
    ASSET_URL="https://wpro-stage.vqode.com/app/assets/";
    MEDIA_URL="https://wpro-stage.vqode.com/public/media";
    STORAGE_URL="https://wpro-stage.vqode.com/storage/app/";
}

export class Constants {
    public static get API_URL(): string { return API_URL; };
    public static get ASSET_URL(): string { return ASSET_URL; };
    public static get MEDIA_URL(): string { return MEDIA_URL; };
    public static get STORAGE_URL(): string {return STORAGE_URL; };
 }