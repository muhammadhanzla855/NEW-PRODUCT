  {{ 'product-detail.css' | asset_url | stylesheet_tag }}

  <section class="custom-pdp product">

    <div class="product-grid">

      <!-- LEFT THUMBNAILS -->
      <div class="thumbs">
        {% for image in product.images limit: 4 %}
          <img
            src="{{ image | image_url: width: 150 }}"
            width="150"
            height="150"
            class="thumbnail"
            alt="{{ image.alt | escape }}"
            onclick="document.getElementById('mainProductImage').src='{{ image | image_url: width: 800 }}'"

            loading="lazy"
          />
        {% endfor %}
      </div>

      <!-- MAIN IMAGE -->
      <div class="main-image">
        <img
          id="mainProductImage"
          src="{{ product.featured_image | image_url: width: 800 }}"
          width="800"
          height="1000"
          alt="{{ product.title }}"
          loading="eager"
        />
      </div>
      <div class="details">
        <p class="breadcrumb">
            <a href="{{ routes.collections_url }}">Collections</a>
            {% if product.collections.first %}
            › <a href="{{ product.collections.first.url }}">{{ product.collections.first.title }}</a>
            {% endif %}
        </p>

        <h1 class="title">
          {{ product.title }}
        </h1>

        <div class="price">
            {% assign price = product.price | money %}
            {% if product.compare_at_price > product.price %}
              <p class="body-large mb-0.5 whitespace-nowrap">
                {{ price }}
              </p>
              <p class="body-medium text-medium-grey ml-1.5 whitespace-nowrap line-through">
                {{- product.compare_at_price | money -}}
              </p>
            {% else %}
              <p class="body-large whitespace-nowrap current">{{ price }}</p>
            {% endif %}
        </div>

        <div class="desc">
          <p>{{ product.metafields.custom.short_description.value }}</p>
        </div>

        <!-- INFO -->
        <div class="info">
          {% if product.metafields.custom.gender.value != blank %}
            <div class="info-item">
              <img src="{{ 'women.svg' | asset_url }}" width="48" height="48" alt="Gender"/>
              <div>
                <p class="info-title">SEX</p>
                <p class="info-value">{{ product.metafields.custom.gender.value }}</p>
              </div>
            </div>
          {% endif %}
          {% if product.metafields.custom.weight.value != blank %}
            <div class="info-item">
              <img src="{{ 'poids.svg' | asset_url }}" width="48" height="48" alt="Weight" />
              <div>
                <p class="info-title">POIDS</p>
                <p class="info-value">{{ product.metafields.custom.weight }}</p>
              </div>
            </div>
          {% endif %}
        </div>

        {% if product.metafields.custom.bloc_description.value != blank %}
        {% assign fields = product.metafields.custom.bloc_description.value %}

        {% if fields.description_attributs.value != blank %}
          <div class="grid grid-cols-2 md:grid-cols-3 gap-x-2.5">
            {% for item in fields.description_attributs.value %}
              <div class="grid grid-cols-[50px_1fr] gap-4 py-4.5">
                <div>
                  {% if item.picto.value != blank %}
                    {% assign label_icon = item.picto.value.nom | handleize | prepend: 'icon-' | append: '.svg' %}
                  {% else %}
                    {% assign label_icon = item.label | handleize | prepend: 'icon-' | append: '.svg' %}
                  {% endif %}
                  <img src="{{ label_icon | asset_url }}" width="48" height="48" alt="{{ item.label }}">
                </div>

                <div class="flex flex-col justify-center">
                  <p class="label-small text-bleu-gris mb-1">{{ item.label }}</p>
                  <p class="body-large">{{ item.valeur }}</p>
                </div>
              </div>
            {% endfor %}
          </div>
        {% endif %}
      {% endif %}


        <!-- ADD TO CART -->
        <a href="https://kinetikadrenalink.com/en/pages/configurator" class="add-cart">
          Customize Now
        </a>

        <!-- ADD TO CART -->
        {% comment %} <form method="post" action="{{ routes.cart_add_url }}">
            <input
            type="hidden"
            name="id"
            value="{{ product.selected_or_first_available_variant.id }}"
            >
            <button type="submit" class="add-cart">
            ADD TO CART
            </button>
        </form> {% endcomment %}

        <!-- BOTTOM ACTIONS -->
        {% comment %} <div class="bottom-actions">
            <!-- Quantity Container -->
            <div class="qty-container">
            <button type="button" class="qty-btn minus">−</button>
            <input type="number" name="quantity" value="1" min="1">
            <button type="button" class="qty-btn plus">+</button>
            </div>

            <div class="wishlist-container">
            <a href="/pages/wishlist" class="wishlist-text">
                ADD TO WISHLIST
            </a>
            </div>
        </div> {% endcomment %}

        <!-- DELIVERY -->
        <div class="delivery">
          <span class="delivery-text1"><strong>FREE express</strong> & Free Returns on orders over £35!</span>
          <span class="delivery-text">Kindly place your order by 6pm on December 22nd for expedited processing</span>
        </div>

        <!-- PAYMENT -->
        <div class="payment">
          <p>Payment method</p>
          <div class="cards">
            <img src="{{ 'visa.svg' | asset_url }}" width="auto" height="auto" alt="Visa">
            <img src="{{ 'mastercard.svg' | asset_url }}" width="auto" height="auto" alt="Mastercard">
            <img src="{{ 'US.svg' | asset_url }}" width="auto" height="auto" alt="US">
            <img src="{{ 'learnmore.svg' | asset_url }}" width="auto" height="auto" alt="Learn more">
          </div>
        </div>

      </div>
    </div> <!-- End product-grid -->
  </section>
    <section class="tabs-section custom-pdp-tab">

        <!-- Tabs -->
        <div class="tabs-header">
            <button data-tab="details" class="tab-btn active">Product Details</button>
            {% comment %} <button data-tab="colors" class="tab-btn">Colors</button> {% endcomment %}
            <button data-tab="sizes" class="tab-btn">Sizes</button>
            <button data-tab="delivery" class="tab-btn">Delivery Details</button>
        </div>

        <!-- Tab Contents -->
        <div class="tabs-content">

            <!-- DETAILS TAB -->
            <div id="details" class="tab-content">
            <div class="card">
                {{ product.description }}
            </div>
            </div>

            <!-- COLORS TAB -->
            {% comment %} <div id="colors" class="tab-content hidden">
            <div class="card">
                <h2>Colors</h2>
                <p>
                Choose the look that matches your style and ride with confidence. The Falkon Pro Race Jersey is available in a curated range of high-performance colors, each selected to complement its sleek, athletic silhouette. Our colors are designed to stay vibrant over time, thanks to premium fade-resistant fabrics.
                </p>
                <div class="color-images">
                <img src="{{ 'text.svg' | asset_url }}" width="auto" height="auto" alt="Color text">
                <img src="{{ 'uimg.svg' | asset_url }}" width="auto" height="auto" alt="Upper view">
                <img src="{{ 'limg.svg' | asset_url }}" width="auto" height="auto" alt="Lower view">
                </div>
            </div>
            </div> {% endcomment %}

            <!-- SIZES TAB -->
            <div id="sizes" class="tab-content hidden">
  <div class="card">

    <!-- Dropdown -->
    <select id="product-size">
      <option selected disabled>Select Size</option>
      {% for variant in product.variants %}
        {% if variant.available %}
          <option value="{{ variant.id }}">{{ variant.title }}</option>
        {% endif %}
      {% endfor %}
    </select>

    <!-- Sizes Row (MOBILE CONTROLLED) -->
    <div class="sizes-mobile">

      {% for variant in product.variants %}
        {% if variant.available %}
          <div class="size-item" data-variant-id="{{ variant.id }}">

            <!-- IMAGE WRAPPER (KEY FIX) -->
            <div class="size-image-wrap">
              {% if variant.image %}
                <img
                  src="{{ variant.image | img_url: '400x' }}"
                  alt="{{ variant.title }}"
                >
              {% else %}
                <img
                  src="{{ 'placeholder.svg' | asset_url }}"
                  alt="{{ variant.title }}"
                >
              {% endif %}
            </div>

            <!-- LABEL -->
            <p class="size-label">{{ variant.title }}</p>

          </div>
        {% endif %}
      {% endfor %}

    </div>
  </div>
</div>

            <!-- DELIVERY TAB -->
            <div id="delivery" class="tab-content hidden">
            <div class="card">
                {{ product.metafields.custom.delivery_details.value }}
            </div>
            </div>

        </div>

    </section>

    <!--VIDEO -->
    <section class="video-section custom-pdp-video">
      <div class="video-container">
        {% assign media = product.metafields.custom.product_video.value %}

        {% if media %}
          {% if media.media_type == 'video' %}
            {{ media | video_tag: controls: true, class: 'w-full rounded-8' }}
          {% elsif media.media_type == 'image' %}
            <img src="{{ media | image_url: width: 2000 }}" class="w-full rounded-8" alt="Product media">
          {% endif %}
        {% else %}
          <p>No product video available.</p>
        {% endif %}
      </div>
    </section>


    <!--- RELATED PRODUCTS --->
    <section class="custom-pdp-related">
      {% unless product.metafields.custom.hide_upsell %}
        {% render 'product-rte-upsell', product: product %}
      {% endunless %}
    </section> 

{% schema %}
{
  "name": "Product Detail Custom",
  "settings": [
    {
      "type": "text",
      "id": "subtitle",
      "label": "Product Detail"
    }
  ]
}
{% endschema %}
<script src="{{ 'product-detail.js' | asset_url }}" defer></script>





/* ------------------- PRODUCT GRID ------------------- */
.custom-pdp .product-grid {
  display: grid;
  grid-template-columns: 130px 620px 1fr;
  gap: 32px;
  align-items: start;
  max-width: 1312px;
  margin: 0 auto;
  margin-top: 40px;
  /* Remove extra padding that increases height */
  padding: 0 64px; 
  height: 660px; /* Force exact height */
  box-sizing: border-box; /* Ensure padding is included in height */
  overflow: hidden; /* Optional: hide anything that exceeds height */
}

/* ------------------- THUMBNAILS ------------------- */
.custom-pdp .thumbs {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.custom-pdp .thumbnail {
  width: 150px;
  height: 150px;
  border: 2px solid #00000069;
  border-radius: 6px;
  object-fit: contain;
  cursor: pointer;
  background-color: #fff;
  transition: border-color 0.2s ease;
}

.custom-pdp .thumbnail:hover {
  border-color: #000;
}

/* ------------------- MAIN IMAGE (Desktop) ------------------- */
.custom-pdp .main-image {
  width: 600px;        /* Figma width */
  height: 652px;       /* Figma height */
  max-width: 100%;     /* keeps it responsive if screen smaller than 600px */
  aspect-ratio: auto;  /* let width/height control size */
  margin: 0 auto;      /* center horizontally */
  border:1px solid;

}

.custom-pdp .main-image img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* maintain proportions, no stretching */
}


/* ------------------- DETAILS ------------------- */
.custom-pdp .details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.custom-pdp .breadcrumb {
  font-size: 12px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.custom-pdp .title {
  
height: 100;
top: 219px;
left: 931px;
angle: 0 deg;
opacity: 1;
font-family: Lay Grotesk - Trial;
font-weight: 500;
font-style: Medium;
font-size: 36px;
leading-trim: NONE;
line-height: 50px;
letter-spacing: -1px;
vertical-align: middle;
      
}

.custom-pdp .price {
  display: flex;
  gap: 6px;              /* slightly smaller gap */
  align-items: baseline;
}

.custom-pdp .price .current {
  font-size: 20px;       /* smaller than 22px */
  font-weight: 700;      /* lighter */
}

.custom-pdp .price .old {
  font-size: 14px;       /* smaller than 16px */
  color: #9ca3af;
  text-decoration: line-through;
}


.custom-pdp .desc p {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.5;
  margin-bottom: 4px;
}

/* ================================
   INFO WRAPPER
================================ */
.custom-pdp .info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 32px; /* space between Sex & Poids blocks */
}
.gap-x-2\.5 {
    column-gap: calc(var(--spacing) * 42.5);
}
/* ================================
   INFO ITEM (Sex / Poids)
================================ */
.custom-pdp .info-item {
  display: flex;
  align-items: center;
  height: 48px; /* Figma exact */
  gap: 12px; /* distance between icon and text */
}

/* ================================
   ICON
================================ */
.custom-pdp .info-item img {
  width: 48px;
  height: 48px;
  display: block;
  flex-shrink: 0;
}

/* ================================
   TEXT WRAPPER
================================ */
.custom-pdp .info-item > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 48px;
}

/* ================================
   TITLE (SEX / POIDS)
================================ */
.custom-pdp .info-title {
  margin: 0;
  font-family: "JetBrains Mono", monospace;
  font-weight: 700;
  font-size: 12px;
  line-height: 13.2px; /* Figma */
  text-transform: uppercase;
  color: #9ca3af;
}

/* ================================
   VALUE (Women / 105 gr)
================================ */
.custom-pdp .info-value {
  margin: 0;
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 16.5px; /* avg of 16.2–16.9 */
  line-height: 23.4px; /* Figma */
  color: #111827;
}


/* Add to Cart */
  .custom-pdp .add-cart {
  display: inline-block;    /* important for width & height to work */
  text-align: center;       /* center text */
  width: 100%;              /* full width */
  height: 60px;
  line-height: 60px;        /* vertically center text */
  background-color: #000;
  color: #fff;
  border: none;             /* buttons only, safe to keep */
  border-radius: 6px;       /* optional */
  font-size: 16px;
  font-weight: 600;
  margin-top: 8px;
  cursor: pointer;
  text-decoration: none;    /* remove underline */
  transition: all 0.3s ease;
}

.custom-pdp .add-cart:hover {
  background-color: transparent;
  color: #000;
  border: 1px solid #000;
}

/* Bottom Actions */
.custom-pdp .bottom-actions {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}

.custom-pdp .qty-container {
  display: flex;
  width: 140px;
  height: 52px;
  border: 1px solid #d1d5db;
  overflow: hidden;
}

.custom-pdp .qty-btn {
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
}

.custom-pdp .qty-container .count {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #d1d5db;
  border-right: 1px solid #d1d5db;
}

/* Wishlist button without border-radius */
.custom-pdp .wishlist-container {
  flex: 1;
  border: 1px solid #000;
  border-radius: 0; /* Removed border-radius */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

/* Delivery Section */
.custom-pdp .delivery {
  display: flex;
  flex-direction: column;
  background-color: #F4F4F4;
  padding: 14px 8px;
  border-radius: 6px;
  gap: 4px;
  margin-top: 9px;
}

.custom-pdp .delivery-text1 {
  font-size: 15px;
  color: #6b7280;
}

.custom-pdp .delivery-text {
  margin-top: 4px;
  font-size: 12px;
  color: #6b7280;
}

/* Payment Section */
.custom-pdp .payment {
  margin-top: 9px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.custom-pdp .payment p {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.custom-pdp .cards {
  display: flex;
  gap: 8px;
}

.custom-pdp .cards img {
  width: 50px;
  height: auto;
  object-fit: contain;
}




/* =================== MOBILE LAYOUT =================== */
@media (max-width: 435px) {

  /* ---------- PRODUCT GRID ---------- */
  .custom-pdp .product-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px;          /* safe padding */
    height: auto;           /* allow content to grow naturally */
    overflow: visible;      /* show all content */
  }

  /* ---------- ORDERING ---------- */
  .custom-pdp .main-image { order: 1; }
  .custom-pdp .thumbs { order: 2; }
  .custom-pdp .details { order: 3; }

  /* ---------- MAIN IMAGE ---------- */
  .custom-pdp .main-image {
    width: 100%;
    max-width: 360px;      /* Figma width */
    height: auto;
    margin: 0 auto;
  }

  .custom-pdp .main-image img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  /* ---------- THUMBNAILS ---------- */
  .custom-pdp .thumbs {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
  }

  .custom-pdp .thumbnail {
    width: 64px;
    height: 66px;
    border-radius: 4px;
    border: 2px solid #00000069;
    object-fit: contain;
    cursor: pointer;
  }

  /* ---------- DETAILS ---------- */
  .custom-pdp .details {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: 0 auto;
  }

  .custom-pdp .breadcrumb {
    font-size: 12px;
  }

  .custom-pdp .title {
    font-size: 22px;
    line-height: 28px;
    font-weight: 500;
  }

  .custom-pdp .price {
    display: flex;
    gap: 16px;
    align-items: baseline;
  }

  .custom-pdp .price .current {
    font-size: 24px;
    font-weight: 700;
    line-height: 28.8px;
  }

  .custom-pdp .price .old {
    font-size: 14px;
    line-height: 28.8px;
    color: #9ca3af;
    text-decoration: line-through;
  }

  .custom-pdp .desc p {
    font-size: 14px;
    line-height: 1.6;
    color: #4b5563;
  }

  /* ---------- SEX / POIDS ---------- */
  .custom-pdp .info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }
  /* Only affect the Women/Poids attributes block */
  .custom-pdp .details .grid.gap-x-2\.5 {
      column-gap: calc(var(--spacing) * 2.5);
  }


  

  .custom-pdp .info-item {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
  }

  .custom-pdp .info-item img {
    width: 40px;
    height: 40px;
  }

  .custom-pdp .info-item > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .custom-pdp .info-title {
    font-size: 12px;
    font-weight: 700;
    color: #9ca3af;
    text-transform: uppercase;
  }

  .custom-pdp .info-value {
    font-size: 16px;
    font-weight: 500;
    color: #111827;
  }

  /* ---------- ADD TO CART ---------- */
  .custom-pdp .add-cart {
    width: 100%;
    height: 52px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    line-height: 52px;
    background-color: #000;
    color: #fff;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    margin-top: 12px;
    transition: all 0.3s ease;
  }

  .custom-pdp .add-cart:hover {
    background-color: transparent;
    color: #000;
    border: 1px solid #000;
  }

  /* ---------- QTY + WISHLIST ---------- */
  .custom-pdp .bottom-actions {
    display: flex;
    gap: 16px;
    margin: 12px auto 0;
    width: 100%;
  }

  .custom-pdp .qty-container {
    flex: 1;
    display: flex;
    height: 47px;
    border: 1px solid #d1d5db;
  }

  .custom-pdp .qty-btn {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .custom-pdp .qty-container .count {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid #d1d5db;
    border-right: 1px solid #d1d5db;
  }

  .custom-pdp .wishlist-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 0;
  }

  /* ---------- DELIVERY ---------- */
  .custom-pdp .delivery {
    width: 100%;
    padding: 12px;
    gap: 8px;
    background-color: #f4f4f4;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    margin-top: 12px;
  }

  .custom-pdp .delivery-text1 {
    font-size: 14px;
    color: #6b7280;
  }

  .custom-pdp .delivery-text {
    font-size: 12px;
    color: #6b7280;
  }

  /* ---------- PAYMENT ---------- */
  .custom-pdp .payment {
    width: 100%;
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .custom-pdp .cards {
    display: flex;
    gap: 16px;
  }

  .custom-pdp .cards img {
    width: 60px;
    height: auto;
    object-fit: contain;
  }

  /* ---------- PRODUCT SIZE ---------- */
  #product-size {
    width: 100%;
  }

  .sizes-mobile {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}

/* ==========================
   Tabs Section
========================== */

.tabs-section.custom-pdp-tab {
  max-width: 1312px;         
  margin: 2px auto;
  padding: 0 64px;
  margin-top:64px;
}

/* Tabs Header */
.custom-pdp-tab .tabs-header {
  display: flex;
  gap: 32px;
  border-bottom: 1px solid #e5e5e5;
  overflow-x: auto;
  background-color: #FAFAFA;
  padding-left:5px;
}

.custom-pdp-tab .tab-btn {
  padding: 16px 0;
  font-size: 16px;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
}

.custom-pdp-tab .tab-btn.active {
  border-color: #000;
  color: #000;
}

.custom-pdp-tab .tab-btn:not(.active) {
  color: #777;
}

/* =========================
   Tabs Content
========================= */
.custom-pdp-tab .tabs-content {
  margin-top: 32px;
  min-height:1px;
  height: auto;        /* grow with content */
  min-height: unset;  /* remove forced minimum */
  overflow: visible;  /* never clip content */
}

/* Tab visibility */
.custom-pdp-tab .tab-content.hidden {
  display: none;
}


/* Card */
.custom-pdp-tab .card {
  padding: 32px;
  background: #fff;
  border-radius: 16px;
  
}

.custom-pdp-tab .card h2 {
  font-size: 20px;
  margin-bottom: 12px;
}

.custom-pdp-tab .card p {
  font-size: 16px;
  line-height: 1.6;
}

/* ===============================
   SIZES TAB — DESKTOP (PC)
================================ */

/* Card wrapper — keep column for dropdown + images */
#sizes .card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  width: 1104px; 
  max-width: 100%;
}

/* Dropdown stays above images */
#product-size {
  width: 525px;
  height: 56px;
  padding: 0 48px 0 16px;
  font-size: 16px;
  font-weight: 500;
  color: #111827;
  background-color: #fff;
  border: 1px solid #d1d5db;
  border-radius: 9px;
  cursor: pointer;
  appearance: none;
  position: relative;
  margin-bottom: 40px;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23111827' stroke-width='2'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 12px 8px;
}

#product-size:focus {
  outline: none;
  border-color: #000;
}

/* Sizes container — horizontal row */
.sizes-mobile {
  display: flex;            /* 🔥 row */
  align-items: flex-end;    /* baseline for different heights */
  gap: 72px;                /* spacing like Figma */
}

/* One size block */
.size-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

/* Image sizing per Figma */
.size-item:nth-child(1) img { width: 128px; height: 110px; }
.size-item:nth-child(2) img { width: 199px; height: 169px; }
.size-item:nth-child(3) img { width: 263px; height: 274px; }
.size-item:nth-child(4) img { width: 322px; height: 367px; }

/* Label styling */
.size-item p {
  margin-top: 16px;
  font-family: "Lay Grotesk - Trial", sans-serif;
  font-size: 28px;
  font-weight: 500;
  line-height: 18px;
  text-align: center;
}
/* ===============================
   SIZES TAB — MOBILE
================================ */
@media (max-width: 767px) {

  /* Card wrapper */
  #sizes .card {
    width: 100%;
    padding: 16px;
  }

  /* Dropdown full width */
  #product-size {
    width: 100%;
    margin-bottom: 24px;
  }

  /* Sizes container — vertical stack */
  .sizes-mobile {
    flex-direction: column;   /* stack vertically */
    align-items: center;      /* center horizontally */
    gap: 24px;                /* spacing between images */
  }

  /* One size block — center text below image */
  .size-item {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  /* Image sizing — scale down proportionally */
  .size-item:nth-child(1) img { width: 96px; height: 82px; }
  .size-item:nth-child(2) img { width: 149px; height: 127px; }
  .size-item:nth-child(3) img { width: 198px; height: 206px; }
  .size-item:nth-child(4) img { width: 244px; height: 278px; }

  /* Labels */
  .size-item p {
    margin-top: 12px;
    font-size: 20px;
    line-height: 16px;
  }
}



/* =========================
   VIDEO SECTION — DESKTOP
========================= */

.video-section.custom-pdp-video {
  max-width: 996px;
  margin: 80px auto;          /* center horizontally */
}

.custom-pdp-video .video-container {
  width: 996px;
  height: 485px;
  border-radius: 16px;
  overflow: hidden;
  background: #000;
}

/* Make both video & image fit */
.custom-pdp-video video,
.custom-pdp-video img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
/* =========================
   VIDEO SECTION — MOBILE
========================= */

@media (max-width: 767px) {

  .video-section.custom-pdp-video {
    max-width: 320px;
    margin: 40px auto;
  }

  .custom-pdp-video .video-container {
    width: 320px;
    height: 160px;
    border-radius: 12px;
  }
@media (max-width: 435px) {

  .tabs-section.custom-pdp-tab {
    padding: 0 16px;   /* ✅ mobile-safe padding */
    margin-top: 32px;
  }

}


document.addEventListener("DOMContentLoaded", () => {

  // ---------------- Thumbnail Click ----------------
  document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById("mainProductImage");
  const thumbnails = document.querySelectorAll(".thumbnail");

  if (thumbnails.length && mainImage) {
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener("click", () => {
        // Set the high-res image
        if (thumbnail.dataset.large) {
          mainImage.src = thumbnail.dataset.large;
        }

        // Optional: update srcset if available
        if (thumbnail.dataset.srcset) {
          mainImage.srcset = thumbnail.dataset.srcset;
        }

        // Update active class
        thumbnails.forEach(t => t.classList.remove("active"));
        thumbnail.classList.add("active");
      });
    });
  }
});


  // ---------------- Tabs ----------------
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  if (tabButtons.length && tabContents.length) {
    tabButtons.forEach(button => {
      button.addEventListener("click", () => {
        const tabId = button.dataset.tab;
        const content = document.getElementById(tabId);
        if (!content) return;

        tabContents.forEach(c => c.classList.add("hidden"));
        tabButtons.forEach(btn => btn.classList.remove("active"));

        content.classList.remove("hidden");
        button.classList.add("active");
      });
    });
  }

});
