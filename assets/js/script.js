document.addEventListener( 'DOMContentLoaded', () => {
    /**
     * ヘッダーを監視する.
     */
    const headerObserver = ( () => {
        const header = document.getElementById( 'js-global-header' );
        if ( !header ) return;

        getHeaderHeight( header );
    } )();

    /**
     * メニューを開閉する.
     */
    const openDrawer = ( () => {
        const drawer = document.getElementById( 'js-menuDrawer' );
        const openButton = document.getElementById( 'js-openDrawer' );
        const closeButton = document.getElementById( 'js-closeDrawer' );

        openButton.addEventListener( 'click', () => {
            drawer.showModal();
        } );

        closeButton.addEventListener( 'click', () => {
            drawer.close();
        } );
    } )();

    /**
     * スクロールを監視する.
     */
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0
    }
    const scrollObserver = new IntersectionObserver( ( entries ) => {
        const entry = entries[0];
        if ( !entry.isIntersecting ) {
            document.body.classList.add( 'scroll' );
        } else {
            document.body.classList.remove( 'scroll' );
        }
    }, options );

    const target = document.getElementById( 'js-hero' ) || header;
    if ( target ) {
        scrollObserver.observe( target );
    }
} );

function getHeaderHeight( header ) {
    /**
     * ヘッダーの高さを取得する.
     */
    const observer = new ResizeObserver( ( entries ) => {
        entry = entries[0];
        if ( entry.borderBoxSize ) {
            const { blockSize } = entry.borderBoxSize[0];
            const roundedHeight = Math.round( blockSize ) + 'px';
            document.documentElement.style.setProperty( '--header-height', roundedHeight );
        }
    } );

    observer.observe( header );
}
