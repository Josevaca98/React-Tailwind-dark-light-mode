import React, { useEffect, useState } from "react";

export default function App() {
  // Use state to keep track of the theme, initially set from localStorage or default to "system"
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );
  // Get the root element of the document
  const element = document.documentElement;
  // Match media query for dark mode preference
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // Define theme options with icons and text
  const options = [
    {
      icon: "sunny",
      text: "light",
    },
    {
      icon: "moon",
      text: "dark",
    },
    {
      icon: "desktop-outline",
      text: "system",
    },
  ];

  // Function to match the window's color scheme preference
  function onWindowMatch() {
    if (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && darkQuery.matches)
    ) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }

  // Initial call to apply the correct theme based on preference
  // onWindowMatch();

  // useEffect to update the theme when the theme state changes
  // useEffect(() => {
  //   switch (theme) {
  //     case "dark":
  //       element.classList.add("dark");
  //       localStorage.setItem("theme", "dark");
  //       break;

  //     case "light":
  //       element.classList.remove("dark");
  //       localStorage.setItem("theme", "light");
  //       break;
  //     default:
  //       localStorage.removeItem("theme");
  //       onWindowMatch();
  //       break;
  //   }
  // }, [element.classList, onWindowMatch, theme]);

  //#region Codigo modificado
  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;

      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [element.classList, onWindowMatch, theme]);

  useEffect(() => {
    const handleChange = (e) => {
      if (!localStorage.getItem("theme")) {
        if (e.matches) {
          element.classList.add("dark");
        } else {
          element.classList.remove("dark");
        }
      }
    };

    darkQuery.addEventListener("change", handleChange);

    return () => {
      darkQuery.removeEventListener("change", handleChange);
    };
  }, [darkQuery, element.classList]);

  //#endregion Codigo Modificado

  // Add event listener to handle changes in color scheme preference
  // darkQuery.addEventListener("change", (e) => {
  //   if (!("theme" in localStorage)) {
  //     if (e.matches) {
  //       element.classList.add("dark");
  //     } else {
  //       element.classList.remove("dark");
  //     }
  //   }
  // });

  // Render the UI
  return (
    <section className="min-h-screen pt-8 dark:text-gray-100 dark:bg-slate-900 duration-100">
      <div className="fixed top-5 right-5 duration-100 dark:bg-slate-800 bg-gray-100 rounded">
        {options?.map((opt) => (
          <button
            key={opt.text}
            onClick={() => setTheme(opt.text)}
            className={`w-8 h-8 leading-9 text-xl rounded-full m-1 ${
              theme === opt.text && "text-sky-600"
            }`}
          >
            <ion-icon name={opt.icon}></ion-icon>
          </button>
        ))}
      </div>
      <div className="max-w-3xl mx-auto px-5">
        <div className="text-center">
          <h2 className="uppercase text-4xl pt-10">José Maria Vaca González</h2>
          <h5 className="pt-5 font-semibold text-2xl">
            Game Developer and Frontend Developer 🎮🧑🏻‍💻
          </h5>
        </div>

        <p className="font-light pt-5 text-justify">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem
          consequuntur tempore hic enim maxime error impedit veniam vel eveniet,
          eaque ipsum amet molestias in? Repudiandae vitae deleniti natus harum
          perspiciatis?
        </p>
        <b></b>
        <p className="font-light pt-5 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum
          modi eveniet nisi id, corporis facere doloremque perferendis
          architecto nulla dolorem consequuntur officia fugiat est, ad numquam
          sequi culpa quas? Beatae, quidem explicabo! Praesentium fugiat unde
          pariatur, similique quasi sed sapiente eos natus eveniet autem, amet
          at quam, hic adipisci optio quibusdam debitis impedit enim facilis.
          Odit beatae eaque modi? Nam, sit quia. Debitis pariatur ipsam atque
          quaerat. Doloremque voluptatum omnis fuga vel laborum exercitationem
          illo ut. Architecto culpa doloremque eius ad ducimus doloribus
          laboriosam facere aliquam. Beatae, sunt doloribus?
        </p>
      </div>
    </section>
  );
}
