(function () {
  const $ = document.querySelector.bind(document);

  const Model = {
    accounts: {
      facebook: {
        name: "@nathanf",
        totalFollowers: 1987,
        todayFollowers: 12,
      },
      twitter: {
        name: "@nathanf",
        totalFollowers: 1044,
        todayFollowers: 99,
      },
      instagram: {
        name: "@realnathanf",
        totalFollowers: "11k",
        todayFollowers: 1099,
      },
      youtube: {
        name: "Nathan F.",
        totalFollowers: 8239,
        todayFollowers: -144,
      },
    },

    todayOverview: {
      facebook: {
        pageViews: 87,
        viewsOverview: 3,
        likes: 52,
        likesOverview: -2,
      },
      instagram: {
        likes: 5462,
        likesOverview: 2257,
        profileViews: "52k",
        viewsOverview: 1375,
      },
      twitter: {
        retweets: 117,
        retweetsOverview: 303,
        likes: 507,
        likesOverview: 553,
      },
      youtube: {
        likes: 107,
        likesOverview: -19,
        totalViews: 1407,
        viewsOverview: -12,
      },
    },
  };

  const Controller = {
    getAccounts: () => Object.entries(Model.accounts),
    getTodayOverview: () => Object.entries(Model.todayOverview),

    init: function () {
      Views.init();
    },
  };

  const Views = {
    init: function () {
      /*
       ** Accounts
      */
      Controller.getAccounts().forEach((account) => {
        const platformName = account[0];
        const accounts = account[1];

        $(".accounts").innerHTML += Components.accounts(platformName, accounts);
      });

      /*
       ** Today Overview
      */

      Controller.getTodayOverview().forEach((overview) => {
        const platformName = overview[0];
        const overviewProperties = overview[1];

        $(".overview .cards").innerHTML += Components.overview(
          platformName,
          overviewProperties
        );
      });

      /*
       ** Theme Toggler
       */
      $("#theme-toggler").onclick = (e) => {
        const isLightTheme = $("html").classList.contains("light");
        if (isLightTheme) {
          $("html").className = "dark";
          e.target.title = "Switch to light mode";
          e.target.ariaLabel = "Switch to light mode";
        } else {
          $("html").className = "light";
          e.target.title = "Switch to dark mode";
          e.target.ariaLabel = "Switch to dark mode";
        }
      };
    },
  };

  const Components = {
    accounts: function (platformName, account) {
      const name = account.name;
      const todayFollowers = account.todayFollowers;
      const totalFollowers = account.totalFollowers;

      return `
          <div class='card ${platformName}'>
            <div class='name center-flex'>
              <img src="images/icon-${platformName}.svg" alt="${platformName} icon" />
              <span>${name}</span>
            </div>

            <div class='total-followers'>
              <strong>${totalFollowers}</strong>
              <span>
                ${platformName === "youtube" ? "Subscribes" : "Followers"}
              </span>
            </div>

            <div class='today-followers center-flex ${
              todayFollowers < 0 ? "decrease" : "increase"
            }'>
              <img src="images/icon-${
                todayFollowers < 0 ? "down" : "up"
              }.svg" alt="" />
              <span>${Math.abs(todayFollowers)}</span> Today
            </div>
          </div>
        `;
    },

    overview: function (platformName, props) {
      const overviewPropertiesNames = Object.getOwnPropertyNames(props);
      const firstPropertyName = overviewPropertiesNames[0];
      const secondPropertyName = overviewPropertiesNames[1];
      const thirdPropertyName = overviewPropertiesNames[2];
      const forthPropertyName = overviewPropertiesNames[3];

      return `
          <div class="card d-grid">
            <div class='space-between-flex'>
              <span>${firstPropertyName.replace(/([A-Z])/g, " $1")}</span>
              <img src="images/icon-${platformName}.svg" alt="${platformName} icon" />
            </div>

            <div class='space-between-flex'>
              <strong>${props[firstPropertyName]}</strong>
              <div class='center-flex ${
                props[secondPropertyName] < 0 ? "decrease" : "increase"
              }'>
                <img src="images/icon-${
                  props[secondPropertyName] < 0 ? "down" : "up"
                }.svg" alt="" />
                <span>${Math.abs(props[secondPropertyName])}</span> %
              </div>
            </div>
          </div>

          <div class="card d-grid">
            <div class='space-between-flex'>
              <span>${thirdPropertyName.replace(/([A-Z])/g, " $1")}</span>
              <img src="images/icon-${platformName}.svg" alt="${platformName} icon" />
            </div>

            <div class='space-between-flex'>
              <strong>${props[thirdPropertyName]}</strong>
              <div class='center-flex ${
                props[forthPropertyName] < 0 ? "decrease" : "increase"
              }'>
                <img src="images/icon-${
                  props[forthPropertyName] < 0 ? "down" : "up"
                }.svg" alt="" />
                <span>${Math.abs(props[forthPropertyName])}</span> %
              </div>
            </div>
          </div>
        `;
    },
  };

  Controller.init();
})();
