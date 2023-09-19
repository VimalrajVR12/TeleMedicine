function navbar (){
    return `
    <div class = "head">
        
    <div class="nav2">
    <div class="nav2-1">
   <nav>
    
      <div class="wrappe">
       
        <input type="radio" name="slider" id="menu-btn">
        <input type="radio" name="slider" id="close-btn">
        
        <ul class="nav-links">
          <label for="close-btn" class="btn close-btn"><i class="fas fa-times"></i></label>
          
          <li>
          
            <a href="productpage.html" class="desktop-item">Medicines</a>
            <input type="checkbox" id="showMega">
            <label for="showMega" class="mobile-item">Medicines</label>
            <div class="mega-box">
              <div class="content">
                <div class="row">
                  <ul class="mega-links">
                  <li><a href="">Health & Care</a></li>
                  <li><a href="">Beauty Care</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <li>
            <a href="#" class="desktop-item">Doctors</a>
            <input type="checkbox" id="showMega">
            <label for="showMega" class="mobile-item">Doctors</label>
            <div class="mega-box">
              <div class="content">
                <div class="row">
                  <ul class="mega-links">
                    <li><a href="#">Physiotherapy</a></li>
                    <li><a href="#">Health Specialist</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
         
          <li>
            <a href="#" class="desktop-item">Pharmacy</a>
            <input type="checkbox" id="showMega">
            <label for="showMega" class="mobile-item">Pharmacy</label>
          </li>
         

          <li>
            <a href="#" class="desktop-item">Other Services</a>
            <input type="checkbox" id="showMega">
            <label for="showMega" class="mobile-item">Other Services</label>
            <div class="mega-box">
              <div class="content">
                <div class="row">
                  <ul class="mega-links">
                    <li><a href="#">Hospital</a></li>
                    <li><a href="#">Contact Us</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
         
        </ul>

        <label for="menu-btn" class="btn menu-btn"><i class="fas fa-bars" style="margin: 10px 0px 0px -90px;"></i></label>
      </div>

    </nav>
      </div> 

    <div class="nav2-2">
        <a class="user" href="./loginUI.html">Signin</a>
        <i class="fa-solid fa-cart-shopping fa-2xl" onclick="showMedCart()" style="color: #00525d; margin-left:20px; cursor: pointer; position: relative">
        <div class="cart-number hide" style="padding: 10px;"></div>
        </i>
        
        <div id="cart_page">
    <div class="medcart meddoverlay"></div>
    <div class="medcart meddcartdiv" id="meddcartdiv">
    <div class="meddcartinnerdiv">
    <div class="parent">
      <div style="display: flex; justify-content: space-between;">
        <div style="display: flex;">
          <h3 style="margin: 15px 0px 0px 20px ;font-size: 20px; color: #1a6aa0;">Your Cart<span id="per"></span></h3>
          <h3 onclick="closeCart()" style="padding-top: 15px; padding-left: 150px; color: #1a6aa0; cursor: pointer">x</h3>
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
          <div style="color: #1a6aa0; margin-bottom:10px ; font-size: 12px;"> Total amount <i class="fa fa-info-circle"></i></div>
        </div>

        
        <div>
         <a href="Address.html" style="text-decoration: none; color: white; "> <button style="cursor: pointer; padding-left: 30px; border-radius: 50px;   margin-top: -50px; height: 50px; border: 1px solid #1a6aa0; background-color: #1a6aa0; font-size: 16px; font-weight: bold; display: flex;
          align-items: center"> Confirm Order <div style="padding: 0 0 0 50px;display: inline-block;"></a>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
      </div>
      
  </div>

</div>
    `
}

export default navbar;
