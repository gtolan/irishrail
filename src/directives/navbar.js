export default function(elem, binding){
    console.log(binding, "ind")
    elem.style.position = "absolute";
    elem.style.top = 0;
    elem.style.width = "100vw";
    elem.style.display = "flex";
    elem.style.flexDirection = 'column';
    elem.style.justifyContent = 'center';

}