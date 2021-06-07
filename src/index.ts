interface LoadScriptOptions {
  src: string;
  id?: string;
  body?: boolean;
}

const insertAfter = (element: HTMLElement, reference: HTMLElement | null) => {
  if (!reference) {
    return;
  }

  const parent = reference.parentNode;

  if (!parent) {
    return;
  }

  parent.insertBefore(element, reference.nextSibling);
};

const loadScript = (
  options: LoadScriptOptions,
  onload?: Function,
  onerror?: Function
) => {
  const script = document.createElement('script');
  const parent = options.body === true ? document.body : document.head;
  const scripts = parent.getElementsByTagName('script');

  script.setAttribute('src', options.src);

  if (options.id) {
    script.setAttribute('id', options.id);
  }

  if (scripts.length > 0) {
    insertAfter(script, scripts.item(scripts.length - 1));
  } else {
    parent.appendChild(script);
  }

  script.onload = function () {
    onload && onload();
  };

  script.onerror = function () {
    onerror && onerror();
  };
};

export default loadScript;
