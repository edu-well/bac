
    // Horizontal scrolling behavior
    const horizontalContainers = document.querySelectorAll('.horizontal-scroll');
    
    horizontalContainers.forEach(container => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });
        
        container.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        container.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        container.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
    });

    // Action icon handlers
    document.querySelectorAll('.action-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            const personName = icon.closest('.person-card').querySelector('.person-name').textContent;
            console.log(`Action clicked for ${personName}`);
        });
    });
    
    // Popup 3 functionality
    const popup3 = document.getElementById('popup3');
    const popup3Pdf = document.getElementById('popup3Pdf');
    const popup3Title = document.getElementById('popup3Title');
    const popup3Download = document.getElementById('popup3Download');
    const popup3CloseBtns = document.querySelectorAll('.popup-3-close, .popup-3-close-btn');
    const fileItems = document.querySelectorAll('.file-item');

    fileItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.tagName === 'BUTTON') return;
                
                const docUrl = item.getAttribute('data-file'); // Should be Google Drive shareable link
                const title = item.getAttribute('data-title');
                openPopup3(docUrl, title);
            });
        });

        function openPopup3(docUrl, title) {
            popup3Title.textContent = title;
            
            // Convert Google Drive URL to embeddable format
            let embedUrl = docUrl;
            
            // If it's a Google Drive link, convert it
            if (docUrl.includes('drive.google.com')) {
                const fileId = docUrl.match(/\/d\/([^\/]+)/)[1] || 
                              docUrl.match(/id=([^&]+)/)[1] || 
                              docUrl.split('/').slice(-1)[0];
                embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
            }
            
            document.getElementById('googleDocsViewer').src = embedUrl;
            
            popup3Download.onclick = () => {
                window.open(docUrl, '_blank');
            };
            
            popup3.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                popup3.classList.add('active');
            }, 10);
        }


    function closePopup3() {
        popup3.classList.remove('active');
        setTimeout(() => {
            popup3.style.display = 'none';
            document.body.style.overflow = 'auto';
            popup3Pdf.src = '';
        }, 300);
    }

    fileItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            
            const pdfFile = item.getAttribute('data-file');
            const title = item.getAttribute('data-title');
            openPopup3(pdfFile, title);
        });
    });

    popup3CloseBtns.forEach(btn => {
        btn.addEventListener('click', closePopup3);
    });

    popup3.addEventListener('click', (e) => {
        if (e.target === popup3) {
            closePopup3();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup3.style.display === 'flex') {
            closePopup3();
        }
    });