const showHomePage = async (req, res) => {
    const templateView  = 'home';
    const title = templateView.toUpperCase();
    res.render(templateView, {title});
}

export {showHomePage};