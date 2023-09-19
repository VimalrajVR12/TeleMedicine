
function navbar(){
    return `
    <div id="navbar">
    <div class="navbar">
        <div class="navbar_left">
            <div class="button_toggle">
                <i class="fa-solid fa-bars"></i>
            </div>
            <div class="logo"><a href="./index.html">TELE MEDICINE</a></div>
            <ul class="links">
                <li><a href="productpage.html">Medicines</a></li>
                <li><a href="">Doctors</a></li>
                <li><a href="">Pharmacy</a></li>
                <li><a href="">Other Services</a></li>
            </ul>
        </div>
        <div class="navbar_right">
            <ul class="user"><li><a href="./loginUI.html"></a></li></ul>
            <div><a href="#"><i class="fa-solid fa-cart-shopping" onclick="showMedCart()"></i></a></div>
            <div id="cart_page">
    <div class="medcart meddoverlay"></div>
    <div class="medcart meddcartdiv" id="meddcartdiv">
    <div class="meddcartinnerdiv">
    <div class="parent">
      <div style="display: flex; justify-content: space-between;">
        <div style="display: flex; ">
          <h3 style="margin: 15px 0px 0px 20px ;font-size: 20px; color: #1a6aa0;">Your Cart<span id="per"></span></h3>
        </div>
        <div>
          <div style="padding: 18px 10px;">
            <a href="#" style="color: #1a6aa0; font-size: 14px; text-decoration: none; font-weight: bold;"></a>
          </div>
        </div>
      </div>
    </div>
   
    <div id="child">
       <hr style="margin-top: 8px;">
      <img style="margin-top: 20%;" src="https://assets.pharmeasy.in/web-assets/images/emptyCart.png">

      <div style="color:  #1a6aa0;  font-size: 15px; margin-top: 3%;">Your Medicine/Healthcare cart is empty!</div>
    
      <div>
        <button onclick="showMedCart()"
          style="cursor: pointer; padding: 15px 30px; border: none;
           margin-top: 10%; background-color:#48abec; color: black; font-size: 16px; font-weight: bold;">Buy Products</button>
      </div>
      <img style="width: 100%; margin-top: 50%; " src="https://www.netmeds.com/images/cms/aw_rbslider/slides/1689009790_Web_Home_Banner.jpg">

    </div>
    

    <!----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
    
    <img id="pngImage" style="margin-top: 10px;" src="gst.png" alt="">
    <div id="bagItems"></div>

    
    <div id="grandTotalParent">
      <img src="cards.png" alt="">
      <hr>
      <div id="gandTotal">
        <div>
          <div style="color: #1a6aa0; font-weight: bold; font-size: 20px;">₹<span id="grandTotalPrice">0</span> </div>
          <div style="color: #1a6aa0; font-size: 12px;"> Total amount <i class="fa fa-info-circle"></i></div>
        </div>

        
        <div>
         <a href="Address.html" style="text-decoration: none; color: white; "> <button style="cursor: pointer;width: 210px;border-radius: 5px; padding-left: 43px; height: 50px; border: 1px solid #1a6aa0; background-color: #1a6aa0; font-size: 16px; font-weight: bold; display: flex;
          align-items: center"> Confirm Order <div style="padding: 0 0 0 50px;display: inline-block;"></a>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
        </div>
    </div>
    <div class="dropdownMenu">
        <li><a href="">Medicines</a></li>
        <li><a href="">Doctors</a></li>
        <li><a href="">Pharmacy</a></li>
        <li><a href="">Other Services</a></li>
    </div>
</div>
    `
}

export default navbar;