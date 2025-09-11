document.addEventListener( 'DOMContentLoaded', () => {
    /**
     * ヘッダーを監視する.
     */
    const headerObserver = ( () => {
        const header = document.getElementById( 'js-global-header' );
        if ( !header ) return;

        getHeaderHeight( header );

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

        const target = document.getElementById( 'js-hero') || header;
        if ( target ) {
            scrollObserver.observe( target );
        }
    } )();

    /**
     * メニューを開閉する.
     */
    const menuDrawer = document.getElementById( 'js-menuDrawer' );
    const openDrawer = document.getElementById( 'js-openDrawer' );
    const closeDrawer = document.getElementById( 'js-closeDrawer' );

    openDrawer.addEventListener( 'click', () => {
        menuDrawer.showModal();
    } );

    closeDrawer.addEventListener( 'click', () => {
        menuDrawer.close();
    } );
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
