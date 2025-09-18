
        document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const mainPage = document.getElementById('mainPage');
            const testPage = document.getElementById('testPage');
            const backBtn = document.getElementById('backBtn');
            const testTitle = document.getElementById('testTitle');
            const testStepIndicator = document.getElementById('testStepIndicator');
            const testList = document.getElementById('testList');
            
            const habitItems = document.querySelectorAll('.habit-item');
            let selectedFocus = null;
            

            // Add click event to each habit item on main page
            habitItems.forEach(item => {
                item.addEventListener('click', function() {
                    // Remove selected class from all items
                    habitItems.forEach(habit => {
                        habit.classList.remove('selected');
                    });
                    
                    // Add selected class to clicked item
                    this.classList.add('selected');
                    
                    // Get selected focus data
                    selectedFocus = {
                        id: this.getAttribute('data-focus'),
                        name: this.getAttribute('data-name')
                    };
                    
                    // Update test page title and step indicator
                    testTitle.textContent = ` ${selectedFocus.name}`;
                    testStepIndicator.textContent = `2ème étape : Ton défi commence"`;
                    
                    // Generate test options
                    generateTestOptions(selectedFocus.id);
                    
                    // Hide main page and show test page
                    mainPage.style.display = 'none';
                    testPage.style.display = 'block';
                    
                    // Add click animation
                    this.style.transform = 'scale(0.97) translateY(-3px)';
                });
            });

            // Back button click handler
            backBtn.addEventListener('click', function() {
                // Hide test page and show main page
                testPage.style.display = 'none';
                mainPage.style.display = 'block';
                
                // Reset selected focus
                selectedFocus = null;
                habitItems.forEach(habit => {
                    habit.classList.remove('selected');
                });
            });

            // Generate test options based on selected focus
            function generateTestOptions(focusId) {
                // Clear existing test options
                testList.innerHTML = '';
                
                // Get test links for the selected focus
                const tests = testLinks[focusId];
                
                // Create test option elements
                tests.forEach((test, index) => {
                    const testItem = document.createElement('div');
                    testItem.className = 'habit-item';
                    testItem.setAttribute('data-link', test.link);
                    testItem.innerHTML = `
                        <div class="habit-name">${test.name}</div>
                        <div class="checkmark"></div>
                    `;
                    
                    // Add click event for test options
                    testItem.addEventListener('click', function() {
                        // Remove selected class from all test items
                        document.querySelectorAll('#testList .habit-item').forEach(item => {
                            item.classList.remove('selected');
                        });
                        
                        // Add selected class to clicked item
                        this.classList.add('selected');
                        
                        // Navigate to the test link after a short delay
                        setTimeout(() => {
                            window.location.href = this.getAttribute('data-link');
                        }, 200);
                    });
                    
                    // Add animation delay
                    testItem.style.animationDelay = `${(index + 1) * 0.1}s`;
                    
                    testList.appendChild(testItem);
                });
            }
        });