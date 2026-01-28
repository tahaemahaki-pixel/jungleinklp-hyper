# Jungle Ink Tattoo - Hyper-Realism Landing Page

## Overview
Landing page for Jungle Ink Tattoo's hyper-realism specialist, Albatross.

## Live URL
- **Production:** https://hyper.jungleinktattoo.com.au

## Hosting
- **Platform:** Vercel
- **Repo:** https://github.com/tahaemahaki-pixel/jungleinklp-hyper
- **Deployment:** Auto-deploys on push to `main`

## Form Configuration (Web3Forms)
- **Service:** Web3Forms (https://web3forms.com)
- **Access Key:** `17d9ca8c-4fce-45e2-8a77-08cc7145c5e4`
- **Email Subject:** "New Tattoo Enquiry - Jungle Ink"
- **From Name:** "Jungle Ink Website"
- **Redirect:** https://hyper.jungleinktattoo.com.au/ (add back when DNS is stable)

## Social Links
- **Instagram:** https://www.instagram.com/jungleinktattoo/
- **Facebook:** https://www.facebook.com/share/1AHwXi2roy/?mibextid=wwXIfr

## File Structure
```
jungleinklp-hyper/
├── index.html      # Main landing page
├── style.css       # Styles
├── script.js       # Scroll animations, form handling
└── assets/         # Images
```

## DNS Setup
- **Domain:** hyper.jungleinktattoo.com.au
- **Type:** CNAME
- **Value:** (Vercel DNS - check Vercel dashboard)

---

## Form Implementation (Reference)

**NOTE:** This implementation is the WORKING reference for all Jungle Ink landing pages.

### Correct Form Setup

#### HTML Structure (index.html lines 194-212)
```html
<form id="enquiry-form" class="booking-form" method="POST" action="https://api.web3forms.com/submit">
    <input type="hidden" name="access_key" value="17d9ca8c-4fce-45e2-8a77-08cc7145c5e4">
    <input type="hidden" name="subject" value="New Tattoo Enquiry - Jungle Ink">
    <input type="hidden" name="from_name" value="Jungle Ink Website">
    <input type="hidden" name="redirect" value="https://hyper.jungleinktattoo.com.au/">

    <div class="form-group">
        <input type="text" name="name" placeholder="Your Name" required>
    </div>
    <div class="form-group">
        <input type="email" name="email" placeholder="Your Email" required>
    </div>
    <div class="form-group">
        <textarea name="message" placeholder="Tell us about your hyper-realism project..." rows="4"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Enquire Now</button>
    <div id="form-status" class="form-status"></div>
</form>
```

#### JavaScript Implementation (script.js lines 19-70)
```javascript
const form = document.getElementById('enquiry-form');
const formStatus = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;

        // Show loading state
        btn.innerText = 'Sending...';
        btn.disabled = true;

        const formData = new FormData(form);
        const action = form.getAttribute('action');

        try {
            const response = await fetch(action, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                formStatus.innerText = "Thank you! Your enquiry has been sent. We'll be in touch soon.";
                formStatus.style.color = "#4CAF50";
                formStatus.style.marginTop = "1rem";
                form.reset();
                btn.innerText = 'Sent!';

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                }, 3000);
            } else {
                formStatus.innerText = data.message || "Oops! There was a problem submitting your form";
                formStatus.style.color = "#ff4d4d";
                formStatus.style.marginTop = "1rem";
                btn.innerText = originalText;
                btn.disabled = false;
            }
        } catch (error) {
            formStatus.innerText = "Oops! There was a problem connecting to the server.";
            formStatus.style.color = "#ff4d4d";
            formStatus.style.marginTop = "1rem";
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });
}
```

### Critical Requirements

1. **Form MUST have `id="enquiry-form"`** - JavaScript uses getElementById()
2. **Form MUST include `<div id="form-status"></div>`** - Displays messages to user
3. **JavaScript MUST check `data.success`** - Web3Forms response format
4. **Action URL fetched dynamically** - Uses `form.getAttribute('action')`
5. **Proper error handling** - Displays errors to users via formStatus

### Web3Forms Response Format
```javascript
// Success
{"success": true, "message": "Email sent successfully"}

// Error
{"success": false, "message": "Error description"}
```

### Testing
Verified working on hyper.jungleinktattoo.com.au as of Jan 29, 2025.

### Related
- Coverup page (jungleinklp) was fixed to match this implementation
- Both sites now share identical form handling code
