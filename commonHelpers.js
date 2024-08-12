import{a as w,S as L,i as y,b as E}from"./assets/vendor-63fcf8bf.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const S=w.create({baseURL:"https://pixabay.com/api/",params:{key:"33901204-9e2cee760dcc4c2bf1fca35a0",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:20},headers:{"Content-Type":"application/json"}});async function m({searchValue:s="",page:r=1,signal:n}){P(s);const{data:a}=await S.get("",{params:{q:s,page:r},signal:n});return a}function P(s){if(s.length>100){const r="Search value may not exceed 100 characters.";throw new Error(r)}}const u=document.getElementById("gallery"),O=new L(".gallery a",{captionsData:"alt",captionDelay:250,overlayOpacity:.8}),d={addPhotos(s){const r=s.map(this.generatePhotoMarkup).join("");u.insertAdjacentHTML("beforeend",r),O.refresh()},clear(){u.innerHTML=""},generatePhotoMarkup({largeImageURL:s,tags:r,webformatURL:n,likes:a,views:e,comments:t,downloads:o}){return`
        <li class="gallery-item">
            <a class="gallery-link" href="${s}">
                <img
                  class="gallery-image"
                  loading="lazy"
                  src="${n}"
                  alt="${r}"
                />
                <span class="gallery-info-bar">
                    <span class="gallery-info">
                        <span class="gallery-info-label">Likes</span>
                        <span class="gallery-info-value">${a}</span>
                    </span>
                    <span class="gallery-info">
                        <span class="gallery-info-label">Views</span>
                        <span class="gallery-info-value">${e}</span>
                    </span>
                    <span class="gallery-info">
                        <span class="gallery-info-label">Comments</span>
                        <span class="gallery-info-value">${t}</span>
                    </span>
                    <span class="gallery-info">
                        <span class="gallery-info-label">Downloads</span>
                        <span class="gallery-info-value">${o}</span>
                    </span>
                </span>
            </a>
        </li>
    `}},l={ref:document.querySelector(".progress-bar"),hide(){this.ref.classList.remove("progress-bar--show")},show(){this.ref.classList.add("progress-bar--show")}},i={success(s){y.success({position:"topRight",message:s})},error(s){y.error({position:"topRight",message:s})}},x=document.querySelector(".sentinel"),b=document.querySelector(".search-form"),p={ref:b.querySelector(".button"),disabled:!1,disable(){this.disabled=!0,this.ref.setAttribute("disabled","")},enable(){this.disabled=!1,this.ref.removeAttribute("disabled")}};b.addEventListener("submit",A);let h="";async function A(s){var r,n,a;if(s.preventDefault(),!p.disabled)try{p.disable(),v(),d.clear(),l.show(),h=((r=s.target.elements["search-value"])==null?void 0:r.value)??"";const e=await m({searchValue:h.trim()});(n=e.hits)!=null&&n.length||i.error("Sorry, there are no images matching your search query. Please try again!"),d.addPhotos(e.hits??[]),(a=e.hits)!=null&&a.length&&R()}catch{i.error((err==null?void 0:err.message)??"Something went wrong")}finally{p.enable(),l.hide()}}let c=null,f=null,g=1;function R(){c=new AbortController;const s={rootMargin:"800px"},r=n=>{n.forEach(async a=>{if(a.isIntersecting)try{l.show(),g+=1;const e=await m({page:g,searchValue:h,signal:c.signal});d.addPhotos(e.hits??[]),q(e.totalHits)}catch(e){if(E(e)&&e.code==="ERR_CANCELED")return;i.error(e.message)}finally{l.hide()}})};f=new IntersectionObserver(r,s),f.observe(x)}function v(){g=1,c&&c.abort(),f&&f.disconnect()}function q(s){s<=u.children.length&&(i.success("We're sorry, but you've reached the end of search results."),v())}
//# sourceMappingURL=commonHelpers.js.map
