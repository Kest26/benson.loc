// live numbers
const time = 1500; // ms (time)

function outNum(num, elem, maxNum) {
    let l = document.querySelector('#' + elem);
    let n = 0; // start
    let startTime;

    function update(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / time;

        n = Math.min(Math.floor(num * progress), num);

        l.innerHTML = n;

        if (n < num) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const numbers = [30, 70, 80, 4];
const maxNum = Math.max(...numbers);

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            numbers.forEach((num, index) => {
                outNum(num, 'out-' + (index + 1), maxNum);
            });
            observer.unobserve(entry.target);
        }
    });
}, options);

const targets = document.querySelectorAll('.out-num');
targets.forEach(target => observer.observe(target));


// Product menu with Expanded block
function expandControl(productId) {
    const productNavigation = document.getElementById(`productNavigation${productId}`);
    const expandedBox = document.getElementById(`productExpandedBox${productId}`);
    const button = document.querySelector(`#productNavigation${productId} .product-button span`);

    // Toggle the 'expanded' class on product-navigation
    productNavigation.classList.toggle('expanded');
    
    // Toggle the 'expanded' class on expanded-box
    expandedBox.classList.toggle('expanded');

    // Toggle the button text
    const buttonText = productNavigation.classList.contains('expanded') ? 'Назад' : 'Подробнее';

    // Get the style of the original tag and apply it to the modified text
    const originalTag = button.children[0].tagName.toLowerCase();
    const originalStyle = window.getComputedStyle(button.children[0]);

    // Create a new button element with the original tag and style
    const newButton = document.createElement(originalTag);
    newButton.style.cssText = originalStyle.cssText;
    newButton.textContent = buttonText;

    // Replace the existing button text with the new one
    button.innerHTML = '';
    button.appendChild(newButton);

    // Add a click event listener to expanded-box to close it when clicked
    expandedBox.addEventListener('click', function() {
        productNavigation.classList.remove('expanded');
        expandedBox.classList.remove('expanded');

        // Restore the original tag and style
        const restoredButton = document.createElement(originalTag);
        restoredButton.style.cssText = originalStyle.cssText;
        restoredButton.textContent = 'Подробнее';

        button.innerHTML = '';
        button.appendChild(restoredButton);
    });
}

// Carousel with product performance characteristics
function showBlock(blockNumber) {
    const blocks = document.querySelectorAll('.product-characteristics-switchable-block');
    blocks.forEach(block => {
        block.style.opacity = '0'; // Hide all blocks initially
        block.style.display = 'none';
    });

    const selectedBlock = document.getElementById(`product-characteristics-block${blockNumber}`);
    if (selectedBlock) {
        selectedBlock.style.display = 'block';
        fadeIn(selectedBlock, 400); // Adjust the duration as needed (e.g., 500ms)
    }
}

function fadeIn(element, duration) {
    element.style.transition = `opacity ${duration}ms ease-in-out`;
    element.style.opacity = '1';
}

function nextBlock(currentBlock) {
    const totalBlocks = 9;
    let nextBlockNumber = (currentBlock % totalBlocks) + 1;
    showBlock(nextBlockNumber);
}

function prevBlock(currentBlock) {
    const totalBlocks = 9;
    let prevBlockNumber = (currentBlock - 2 + totalBlocks) % totalBlocks + 1;
    showBlock(prevBlockNumber);
}

/* Scroll To Top Button With Scroll Progress */
let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let progressValue = document.getElementById("progress-value");
    let pos = document.documentElement.scrollTop;
    let calcHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if (pos > 100) {
      scrollProgress.style.display = "grid";
    } else {
      scrollProgress.style.display = "none";
    }
    scrollProgress.addEventListener("click", () => {
      document.documentElement.scrollTop = 0;
    });
    scrollProgress.style.background = `conic-gradient(#03cc65 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
  };
  
  window.onscroll = calcScrollValue;
  window.onload = calcScrollValue;

// Marking

var initialMargin = 250; // Store the initial margin value

window.addEventListener('scroll', function() {
    var block = document.getElementById('marking-bkg'); // Get the block element
    var rect = block.getBoundingClientRect(); // Get the coordinates of the block
    var viewportHeight = window.innerHeight; // Get the height of the viewport
    var marginValue = Math.max(0, rect.bottom - viewportHeight); // Calculate the margin value based on the position of the block
    marginValue = Math.min(marginValue, 300); // Limit the margin value to 300 pixels
    marginValue = initialMargin - marginValue; // Subtract the margin value from the initial margin
    if (window.matchMedia('(max-width: 768px)').matches) { // Check if the screen width is less than 768 pixels
        marginValue = 0; // Set the margin value to zero
    }
    block.style.marginRight = +marginValue + 'px'; // Set the margin value
});

