$(document).ready(function () {

    $('[data-toggle="tooltip"]').tooltip();

    // Rera Non-Rera 
    //  $("body").attr('id', 'on-rera');


    // Rera Non-Rera Condition
    $("body").attr('id', 'on-rera'); // Or 'non-rera'
    $("body").removeClass('is-loading'); // Remove hiding class AFTER setting the 

    $('#navbarNav a[href^="#"]').on('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior

        let target = $($(this).attr('href')); // Get the target element
        let offset = 50; // Offset height (e.g., height of fixed header)

        if (target.length) {
            $('html, body').animate(
                {
                    scrollTop: target.offset().top - offset
                },
                500 // Animation duration in ms
            );
        }
    });



    // Location Advantage stop a href 
    // Adjust scroll for anchor links
    $('#exTab1 > a[href^="#"]').on('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior

        let target = $($(this).attr('href')); // Get the target element
        let offset = 50; // Offset height (e.g., height of fixed header)

        if (target.length) {
            $('html, body').animate(
                {
                    scrollTop: target.offset().top - offset
                },
                500 // Animation duration in ms
            );
        }
    });

    // Form name submission code
    $(".custom-btn, .data-id-btn").click(function () {
        var myBookId = $(this).data('id');
        $(".form_name").val(myBookId);
    });

    // Toggle more and less content
    $(".moredisclaimerBtn").click(function () {
        if ($(this).html() === 'Read more <i class="fa fa-chevron-down"></i>') {
            $(this).html('Read less <i class="fa fa-chevron-up"></i>');
        }
        else {
            $(this).html('Read more <i class="fa fa-chevron-down"></i>');
        }
        $(".moredisclaimerText[data-hit=more" + $(this).data('target') + "]").slideToggle(500);
    });

    $(".moreBtn").click(function () {
        var button = $(this);
        var target = button.data('target');
        var isReadMore = button.html().includes('Read more');
        var newHtml = isReadMore ? 'Read less <i class="fa fa-chevron-up"></i>' : 'Read more <i class="fa fa-chevron-down"></i>';
        button.html(newHtml);
        $(".moreText[data-hit=more" + target + "]").slideToggle(500);
    });

    // Modal content update
    $('#enquire-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var recipient = button.data('bs-whatever');
        var modal = $(this);
        modal.find('.modal-title').text(recipient);
        modal.find('input[name="recipient"]').val(recipient);
    });

});

//form submit//
function submitForm(event, formName) {
    // alert("hii");
    event.preventDefault(); // Prevent default form submission
    console.log("--- submitForm called for:", formName, "---"); // DEBUG

    // --- Get Form and Price ---
    const formElement = document.forms[formName];
    if (!formElement) {
        console.error("CRITICAL: Form element not found for name:", formName); // DEBUG
        return; // Exit if form doesn't exist
    }
    var price = $(".price-sub-text").text().trim();


    // --- URL Handling ---
    var currentUrl = window.location.href;

    // Fix URL if it contains more than one '?'
    var questionMarkIndex = currentUrl.indexOf('?');
    var secondQuestionMarkIndex = currentUrl.indexOf('?', questionMarkIndex + 1);

    if (secondQuestionMarkIndex !== -1) {
        currentUrl = currentUrl.substring(0, secondQuestionMarkIndex) + '&' + currentUrl.substring(secondQuestionMarkIndex + 1);
    }

    // Handle URL fragment (everything after #)
    var hashIndex = currentUrl.indexOf('#');
    if (hashIndex !== -1) {
        var fragment = currentUrl.substring(hashIndex + 1);
        currentUrl = currentUrl.substring(0, hashIndex) + '&' + fragment;
    }



    // --- Clear Previous Errors & Styles ---
    const errorMessages = formElement.querySelectorAll('.error');
    errorMessages.forEach(function (error) {
        error.style.display = 'none';
    });
    const inputs = formElement.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
    });


    // --- Validation Logic ---
    let isValid = true; // Start assuming valid
    const formData = new FormData(formElement);

    const nameInput = formElement.querySelector('[name="name"]');
    const mobileInput = formElement.querySelector('[name="mobile"]');
    const consentCheckbox = formElement.querySelector('.form-check-input[type="checkbox"]');

    // Validate Name
    if (nameInput) { // Check if the input exists first
        console.log("Name input found. Is required?", nameInput.required); // DEBUG
        if (nameInput.required) { // Only validate if it's required
            const nameValue = nameInput.value.trim(); // Trim whitespace!
            const nameErrorSpan = nameInput.closest('.forms-input-fields')?.querySelector('.error') || nameInput.parentNode.querySelector('.error'); // Try parentNode as fallback
            console.log(`Name value (raw): "${nameInput.value}" | (trimmed): "${nameValue}"`); // DEBUG

            if (nameValue === '') {
                console.log("Validation Failed: Name is empty or spaces."); // DEBUG
                isValid = false;
                if (nameErrorSpan) {
                    nameErrorSpan.textContent = 'Name field is required.';
                    nameErrorSpan.style.display = 'inline';
                } else { console.warn("Name error span not found!"); } // DEBUG
                nameInput.classList.add('is-invalid');
            } else {
                nameInput.classList.add('is-valid');
            }
        }
    } else { console.log("Name input not found in form:", formName); } // DEBUG

    // Validate Mobile
    if (mobileInput) { // Check if the input exists
        console.log("Mobile input found. Is required?", mobileInput.required); // DEBUG
        if (mobileInput.required) { // Only validate if it's required
            const mobileValue = mobileInput.value.trim(); // Trim whitespace!
            const mobileErrorSpan = mobileInput.closest('.forms-input-fields')?.querySelector('.error') || mobileInput.parentNode.querySelector('.error'); // Try parentNode as fallback
            console.log(`Mobile value (raw): "${mobileInput.value}" | (trimmed): "${mobileValue}"`); // DEBUG

            if (mobileValue === '') {
                console.log("Validation Failed: Mobile is empty or spaces."); // DEBUG
                isValid = false;
                if (mobileErrorSpan) {
                    mobileErrorSpan.textContent = 'Mobile field is required.';
                    mobileErrorSpan.style.display = 'inline';
                } else { console.warn("Mobile error span not found!"); } // DEBUG
                mobileInput.classList.add('is-invalid');
            }
            else {
                mobileInput.classList.add('is-valid');
            }
        }
    } else { console.log("Mobile input not found in form:", formName); } // DEBUG

    // --- Stop Submission If Invalid ---
    console.log("Final validation check. Is form valid?", isValid); // DEBUG
    if (!isValid) {
        const firstInvalid = formElement.querySelector('.is-invalid');
        if (firstInvalid) {
            firstInvalid.focus();
        }
        console.log("STOPPING SUBMISSION due to validation errors."); // DEBUG
        return; // Exit the function
    }

    // --- Prepare Data for Submission (If Valid) ---
    console.log("Validation passed. Preparing data for AJAX..."); // DEBUG
    var formnameValue = formData.get('form_name');
    var form_data = {
        name: formData.get('name') ? formData.get('name').trim() : '',
        email: formData.get('email') ? formData.get('email').trim() : '',
        mobile: formData.get('mobile') ? formData.get('mobile').trim() : '',
        form_name: formnameValue,
        website_url: formData.get('website_url') ? formData.get('website_url') : window.location.origin,
        price: price,
        currentUrl: currentUrl
    };

    // --- Disable Submit Button ---
    const submitButton = formElement.querySelector('button[type="submit"], button.preRegisterBtn, button.data-id-btn[onclick*="submitForm"]');
    let originalButtonText = '';
    if (submitButton) {
        const span = submitButton.querySelector('span');
        if (span) {
            originalButtonText = span.textContent;
            span.textContent = 'Submitting...';
        } else {
            originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';
        }
        submitButton.disabled = true;
    } else {
        console.warn("Submit button not found for disabling!");
    }


    // --- AJAX Request ---
    console.log("Sending AJAX request to submit.php with data:", form_data); // DEBUG
    $.ajax({
        type: 'POST',
        url: 'submit.php',
        data: form_data,
        success: function (response) {
            console.log("AJAX Success Response:", response); // DEBUG
            formElement.reset();
            inputs.forEach(input => {
                input.classList.remove('is-invalid', 'is-valid');
            });
            errorMessages.forEach(error => error.style.display = 'none');

            if (formName === 'modal-form' || formName === 'main-popup') {
                const modalElement = document.getElementById('enquire-modal');
                if (modalElement) {
                    try { // Add try-catch for modal instance
                        const modalInstance = bootstrap.Modal.getInstance(modalElement);
                        if (modalInstance) { modalInstance.hide(); }
                        else { $(modalElement).modal('hide'); }
                    } catch (e) {
                        console.error("Error hiding modal:", e);
                        $(modalElement).modal('hide'); // Fallback jQuery hide
                    }
                }
            }

            if (formnameValue === 'Brochure') {
                window.location.href = 'thankyou.html?formName=Brochure';
            } else if (formnameValue === 'Sample-Flat') {
                window.location.href = 'thankyou.html?formName=Sample-Flat';
            } else {
                window.location.href = 'thankyou.html';
            }
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', status, error, xhr.responseText); // DEBUG
            alert('An error occurred while submitting the form. Please try again later.');
        },
        complete: function () {
            console.log("AJAX request complete."); // DEBUG
            if (submitButton) {
                submitButton.disabled = false;
                const span = submitButton.querySelector('span');
                if (span) {
                    span.textContent = originalButtonText;
                } else {
                    submitButton.textContent = originalButtonText;
                }
            }
        }

    });
}


//#sitelink code (to prepend #sectionID)
(function () {
    let utmParams = "";

    const currentUrl = new URL(window.location.href);

    if (currentUrl.search.length) {
        utmParams = currentUrl.search;
    }

    if (!utmParams && currentUrl.hash.includes("?")) {
        utmParams = "?" + currentUrl.hash.split("?")[1];
    }

    document.querySelectorAll('#navbarNav a.nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const anchor = this.getAttribute("href").split("?")[0];
            const newUrl = `${currentUrl.origin}${currentUrl.pathname}${anchor}${utmParams}`;

            history.pushState(null, '', newUrl); // Update URL without reload
            const target = document.querySelector(anchor);
            if (target) target.scrollIntoView({ behavior: "smooth" });
        });
    });
})();



/* Extracted from index.html */
$(window).on("load", function () {
    // Wait for 5 seconds (5000 milliseconds) after the page has loaded
    setTimeout(function () {
        $("#autoPopup").modal("show");
    }, 5000);
});

$(document).ready(function () {
    $(".js-gallery").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        autoplay: true,
        autoplaySpeed: 2000,
        adaptiveHeight: true,
        prevArrow: '<span class="gallery-arrow mod-prev"><i class="fas fa-arrow-left"></i></span>',
        nextArrow: '<span class="gallery-arrow mod-next"><i class="fas fa-arrow-right"></i></span>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    centerMode: true,
                    centerPadding: "0px",
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 980,
                settings: {
                    centerMode: true,
                    centerPadding: "0px",
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    centerMode: false,
                    centerPadding: "0px",
                    slidesToShow: 1,
                },
            },
        ],
    });
    $(".js-gallery").slickLightbox({
        src: "src",
        itemSelector: ".js-gallery-popup img",
        background: "rgba(0, 0, 0, .7)",
    });

    $("#slick1").slick({
        rows: 2,
        dots: false,
        arrows: true,
        prevArrow: '<span class="amenities-arrow mod-prev"><i class="fas fa-arrow-left"></i></span>',
        nextArrow: '<span class="amenities-arrow mod-next"><i class="fas fa-arrow-right"></i></span>',
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    centerMode: true,
                    centerPadding: "0px",
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 980,
                settings: {
                    centerMode: true,
                    centerPadding: "0px",
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480,
                row: 1,
                settings: {
                    centerMode: true,
                    centerPadding: "0px",
                    slidesToShow: 1,
                },
            },
        ],
    });
});

$(document).ready(function () {
    var itiInstances = [];

    $(".phone").each(function () {
        var input = this;
        var iti = window.intlTelInput(input, {
            initialCountry: "in", // ✅ Default India
            separateDialCode: true,
            allowDropdown: false,
            utilsScript: "assets/js/utils.js",
        });
        itiInstances.push({ input: input, iti: iti });

        // Update values on country change as well
        $(input).on("countrychange", function () {
            $(input).trigger("keyup");
        });
    });

    $(".phone").on("keyup change", function () {
        var input = this;
        // ✅ find the corresponding iti instance for this input
        var instance = itiInstances.find((item) => item.input === input);
        if (!instance) return;

        var fullNumber = instance.iti.getNumber(); // E.164 format e.g. +919876543210
        var countryData = instance.iti.getSelectedCountryData();

        //$(input).closest('form').find("input[name='fullMobileNo']").val(fullNumber);
        $(input).closest("form").find("input[name='iso_code']").val(countryData.iso2);
        $(input)
            .closest("form")
            .find("input[name='mobileExt']")
            .val("+" + countryData.dialCode);
    });
});
var querystring = window.location.href;
var aaa = querystring.split("?");
jQuery("#utmtracking a").each(function () {
    var href = jQuery(this).attr("href");
    var href2 = href + "?" + aaa[1];
    jQuery(this).attr("href", href2);
});

var current_url = querystring;
//alert(current_url);
var str2 = "utm_";
if (current_url.indexOf(str2) != -1) {
    setCookie("cp_utm_data", current_url, 1);
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

setInterval(function () {
    $(".mod-next").triggerHandler("click");
}, 2000);
