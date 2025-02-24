import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
const Footer = () => {
  return (
    <div>
      <div class="container my-5">
        <footer class="text-center text-lg-start text-color">
          <div class="container-fluid p-4 pb-0">
            <section class="">
              <div class="row">
                <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase text-color-second">Food Finder</h5>

                  <p class="p-text">
                    Welcome to our vibrant multivendor marketplace, where a
                    world of restaurants and buyers unite to create endless
                    shopping possibilities.
                  </p>
                </div>

                {/* <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase text-color-second">About us</h5>
                </div> */}
                <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <a
                    href="/aboutus"
                    class="nav-link active"
                    aria-current="page"
                  >
                    <h5 class="text-uppercase text-color-second">About us</h5>
                  </a>
                </div>

                {/* <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase text-color-second">Contact us</h5>
                </div> */}

                <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <a
                    href="/contactus"
                    class="nav-link active"
                    aria-current="page"
                  >
                    <h5 class="text-uppercase text-color-second">Contact us</h5>
                  </a>
                </div>

                <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase text-color-second">Careers</h5>
                </div>
              </div>
            </section>

            <hr class="mb-4" />

            <section>
              <div style={{ textAlign: "center" }}>
                <SocialIcon
                  style={{ height: 35, width: 35, margin: 5 }}
                  url="https://www.instagram.com/"
                />

                <SocialIcon
                  style={{ height: 35, width: 35, margin: 5 }}
                  url="https://www.facebook.com/"
                />

                <SocialIcon
                  style={{ height: 35, width: 35, margin: 5 }}
                  url="https://mail.google.com/mail/"
                />
              </div>
            </section>

            <hr class="mb-4" />
          </div>

          <div class="copyright-text">© 2025 Copyright:codewitharrays</div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
