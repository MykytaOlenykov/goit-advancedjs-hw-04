import{a as w,S as L,i as y,b as E}from"./assets/vendor-63fcf8bf.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(e){if(e.ep)return;e.ep=!0;const a=n(e);fetch(e.href,a)}})();const S=w.create({baseURL:"https://pixabay.com/api/",params:{key:"33901204-9e2cee760dcc4c2bf1fca35a0",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:20},headers:{"Content-Type":"application/json"}});async function m({searchValue:s="",page:t=1,signal:n}){P(s);const{data:r}=await S.get("",{params:{q:s,page:t},signal:n});return r}function P(s){if(s.length>100){const t="Search value may not exceed 100 characters.";throw new Error(t)}}const u=document.getElementById("gallery"),O=new L(".gallery a",{captionsData:"alt",captionDelay:250,overlayOpacity:.8}),d={addPhotos(s){const t=s.map(this.generatePhotoMarkup).join("");u.insertAdjacentHTML("beforeend",t),O.refresh()},clear(){u.innerHTML=""},generatePhotoMarkup({largeImageURL:s,tags:t,webformatURL:n,likes:r,views:e,comments:a,downloads:o}){return`
        <li class="gallery-item">
            <a class="gallery-link" href="${s}">
                <img
                  class="gallery-image"
                  loading="lazy"
                  src="${n}"
                  alt="${t}"
                />
                <span class="gallery-info-bar">
                    <span class="gallery-info">
                        <span class="gallery-info-label">Likes</span>
                        <span class="gallery-info-value">${r}</span>
                    </span>
                    <span class="gallery-info">
                        <span class="gallery-info-label">Views</span>
                        <span class="gallery-info-value">${e}</span>
                    </span>
                    <span class="gallery-info">
                        <span class="gallery-info-label">Comments</span>
                        <span class="gallery-info-value">${a}</span>
                    </span>
                    <span class="gallery-info">
                        <span class="gallery-info-label">Downloads</span>
                        <span class="gallery-info-value">${o}</span>
                    </span>
                </span>
            </a>
        </li>
    `}},l={ref:document.querySelector(".progress-bar"),hide(){this.ref.classList.remove("progress-bar--show")},show(){this.ref.classList.add("progress-bar--show")}},i={success(s){y.success({position:"topRight",message:s})},error(s){y.error({position:"topRight",message:s})}},x=document.querySelector(".sentinel"),b=document.querySelector(".search-form"),p={ref:b.querySelector(".button"),disabled:!1,disable(){this.disabled=!0,this.ref.setAttribute("disabled","")},enable(){this.disabled=!1,this.ref.removeAttribute("disabled")}};b.addEventListener("submit",A);let h="";async function A(s){var t,n,r;if(s.preventDefault(),!p.disabled)try{p.disable(),v(),d.clear(),l.show(),h=((t=s.target.elements["search-value"])==null?void 0:t.value)??"";const e=await m({searchValue:h.trim()});(n=e.hits)!=null&&n.length||i.error("Sorry, there are no images matching your search query. Please try again!"),d.addPhotos(e.hits??[]),(r=e.hits)!=null&&r.length&&R()}catch(e){i.error((e==null?void 0:e.message)??"Something went wrong")}finally{p.enable(),l.hide()}}let c=null,f=null,g=1;function R(){c=new AbortController;const s={rootMargin:"200px"},t=n=>{n.forEach(async r=>{if(r.isIntersecting)try{l.show(),g+=1;const e=await m({page:g,searchValue:h,signal:c.signal});d.addPhotos(e.hits??[]),q(e.totalHits)}catch(e){if(E(e)&&e.code==="ERR_CANCELED")return;i.error(e.message)}finally{l.hide()}})};f=new IntersectionObserver(t,s),f.observe(x)}function v(){g=1,c&&c.abort(),f&&f.disconnect()}function q(s){s<=u.children.length&&(i.success("We're sorry, but you've reached the end of search results."),v())}
//# sourceMappingURL=commonHelpers.js.map
