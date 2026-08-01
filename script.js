const header =
    document.querySelector(".site-header");

const menuButton =
    document.getElementById("menuButton");

const navLinks =
    document.getElementById("navLinks");

const cursorGlow =
    document.querySelector(".cursor-glow");

const terminalContent =
    document.getElementById("terminalContent");

const restartTerminalButton =
    document.getElementById("restartTerminal");

const copyEmailButton =
    document.getElementById("copyEmailButton");

const toast =
    document.getElementById("toast");


window.addEventListener("scroll", function () {

    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


menuButton.addEventListener("click", function () {

    const menuIsOpen =
        navLinks.classList.toggle("open");

    menuButton.setAttribute(
        "aria-expanded",
        menuIsOpen
    );

});


const navigationItems =
    document.querySelectorAll(".nav-links a");

navigationItems.forEach(function (navigationItem) {

    navigationItem.addEventListener("click", function () {

        navLinks.classList.remove("open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


window.addEventListener("pointermove", function (event) {

    cursorGlow.style.left =
        event.clientX + "px";

    cursorGlow.style.top =
        event.clientY + "px";

});


const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }

            });

        },

        {
            threshold: 0.12
        }

    );


const revealElements =
    document.querySelectorAll(".reveal");

revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


const filterButtons =
    document.querySelectorAll(".filter-button");

const projectCards =
    document.querySelectorAll(".project-card");


filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (filterButton) {
            filterButton.classList.remove("active");
        });

        button.classList.add("active");

        const selectedFilter =
            button.dataset.filter;

        projectCards.forEach(function (projectCard) {

            const projectCategories =
                projectCard.dataset.category.split(" ");

            const shouldHide =
                selectedFilter !== "all" &&
                !projectCategories.includes(
                    selectedFilter
                );

            projectCard.classList.toggle(
                "hidden",
                shouldHide
            );

        });

    });

});


const terminalLines = [

    {
        type: "command",
        text: "whoami"
    },

    {
        type: "output",
        text:
            "Kelvin Kuuli — Cybersecurity Student and ICT Graduate"
    },

    {
        type: "command",
        text: "cat focus.txt"
    },

    {
        type: "output",
        text:
            "Digital Forensics | Network Security | Secure Development"
    },

    {
        type: "command",
        text: "ls projects/"
    },

    {
        type: "output",
        text:
            "UFITAT/  PiPS/  timetable-system/  security-labs/"
    },

    {
        type: "command",
        text: "echo $MISSION"
    },

    {
        type: "output",
        text:
            "Build useful systems. Preserve evidence. Reduce risk."
    }

];


let terminalRunNumber = 0;


function wait(milliseconds) {

    return new Promise(function (resolve) {

        setTimeout(resolve, milliseconds);

    });

}


async function typeText(
    element,
    text,
    typingSpeed
) {

    for (const character of text) {

        element.textContent += character;

        await wait(typingSpeed);

    }

}


async function runTerminal() {

    terminalRunNumber++;

    const currentRun =
        terminalRunNumber;

    terminalContent.innerHTML = "";


    for (const line of terminalLines) {

        if (currentRun !== terminalRunNumber) {
            return;
        }


        const terminalLine =
            document.createElement("div");

        terminalLine.classList.add(
            "terminal-line"
        );

        terminalContent.appendChild(
            terminalLine
        );


        if (line.type === "command") {

            const prompt =
                document.createElement("span");

            prompt.classList.add(
                "terminal-prompt"
            );

            prompt.textContent =
                "kelvin@portfolio:~$ ";

            terminalLine.appendChild(prompt);


            const commandText =
                document.createElement("span");

            terminalLine.appendChild(
                commandText
            );


            await typeText(
                commandText,
                line.text,
                35
            );


            await wait(280);

        } else {

            const outputText =
                document.createElement("span");

            outputText.classList.add(
                "terminal-output"
            );

            terminalLine.appendChild(
                outputText
            );


            await typeText(
                outputText,
                line.text,
                9
            );


            await wait(260);

        }

    }


    const terminalCursor =
        document.createElement("span");

    terminalCursor.classList.add(
        "terminal-cursor"
    );

    terminalContent.appendChild(
        terminalCursor
    );

}


runTerminal();


restartTerminalButton.addEventListener(
    "click",
    runTerminal
);


copyEmailButton.addEventListener(
    "click",
    async function () {

        const emailAddress =
            copyEmailButton.dataset.email;


        try {

            await navigator.clipboard.writeText(
                emailAddress
            );

            toast.textContent =
                "Email copied";

        } catch (error) {

            toast.textContent =
                emailAddress;

        }


        toast.classList.add("show");


        setTimeout(function () {

            toast.classList.remove("show");

        }, 2200);

    }
);


const currentYear =
    new Date().getFullYear();

document.getElementById(
    "currentYear"
).textContent = currentYear;