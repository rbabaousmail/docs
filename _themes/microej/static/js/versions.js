/*
  Adapted from the Readthedocs theme version.js template
  https://github.com/readthedocs/sphinx_rtd_theme/blob/master/sphinx_rtd_theme/static/js/versions.js_t
 */
function renderLanguages(config) {
   if (!config.projects.translations.length) {
     return "";
   }

   const languagesHTML = `
     <dl>
       <dt>{{ _('Languages') }}</dt>
       ${ config.projects.translations.map(
       (translation) => `
       <dd ${ translation.slug == config.projects.current.slug ? 'class="rtd-current-item"' : '' }>
         <a href="${ translation.urls.documentation }">${ translation.language.code }</a>
       </dd>
       `).join("\n")}
     </dl>
   `;
   return languagesHTML;
 }

function renderVersions(config) {
  if (!config.versions.active.length) {
    return "";
  }
  const versionsHTML = `
    <dl>
      <dt>{{ _('Versions') }}</dt>
      ${ config.versions.active.map(
      (version) => `
      <dd ${ version.slug === config.versions.current.slug ? 'class="rtd-current-item"' : '' }>
        <a href="${ version.urls.documentation }">${ version.slug }</a>
      </dd>
      `).join("\n")}
    </dl>
  `;
  return versionsHTML;
}

function renderDownloads(config) {
  if (!Object.keys(config.versions.current.downloads).length) {
    return "";
  }
  const downloadsNameDisplay = {
    pdf: "PDF"
  };

  const downloadsHTML = `
    <dl>
      <dt>{{ _('Downloads') }}</dt>
      ${ Object.entries(config.versions.current.downloads).map(
      ([name, url]) => `
        <dd>
          <a href="${ url }">${ downloadsNameDisplay[name] }</a>
        </dd>
      `).join("\n")}
    </dl>
  `;
  return downloadsHTML;
}

document.addEventListener("readthedocs-addons-data-ready", function(event) {
  const config = event.detail.data();

  const flyout = `
    <div class="rst-versions" data-toggle="rst-versions" role="note">
      <span class="rst-current-version" data-toggle="rst-current-version">
        <span class="fa fa-book"> Read the Docs</span>
        v: ${ config.versions.current.slug }
        <span class="fa fa-caret-down"></span>
      </span>
      <div class="rst-other-versions">
        <div class="injected">
          ${ renderLanguages(config) }
          ${ renderVersions(config) }
          ${ renderDownloads(config) }
          <dl>
            <dt>{{ _('On Read the Docs !!! :3') }}</dt>
            <dd>
              <a href="${ config.projects.current.urls.home }">{{ _('Project Home') }}</a>
            </dd>
            <dd>
              <a href="${ config.projects.current.urls.builds }">{{ _('Builds') }}</a>
            </dd>
            <dd>
              <a href="${ config.projects.current.urls.downloads }">{{ _('Downloads') }}</a>
            </dd>
          </dl>
          <dl>
            <dt>{{ _('Search') }}</dt>
            <dd>
              <form id="flyout-search-form">
                <input
                  class="wy-form"
                  type="text"
                  name="q"
                  aria-label="{{ _('Search docs') }}"
                  placeholder="{{ _('Search docs') }}"
                  />
              </form>
            </dd>
          </dl>
          <hr />
          <small>
            <span>Hosted by <a href="https://about.readthedocs.org/?utm_source={{ READTHEDOCS_PROJECT }}&utm_content=flyout">Read the Docs</a></span>
          </small>
        </div>
      </div>
  `;

  // Inject the generated flyout into the body HTML element.
  //document.body.insertAdjacentHTML("beforeend", flyout);
  document.querySelector("wy-grid-for-nav").insertAdjacentHTML("afterend", flyout);

  console.log(document.querySelector("wy-grid-for-nav"));

  // Trigger the Read the Docs Addons Search modal when clicking on the "Search docs" input from inside the flyout.
  document.querySelector("#flyout-search-form").addEventListener("focusin", () => {
    const event = new CustomEvent("readthedocs-search-show");
    document.dispatchEvent(event);
  });

  // Trigger the Read the Docs Addons Search modal when clicking on "Search docs" input from the topnav.
  document.querySelector("#sidebar-search-form").addEventListener("focusin", () => {
    const event = new CustomEvent("readthedocs-search-show");
    document.dispatchEvent(event);
  });
});
