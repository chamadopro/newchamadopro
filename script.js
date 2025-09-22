// ChamadoPro Application JavaScript
class ChamadoProApp {
    constructor() {
        this.currentUser = null;
        this.isLoading = false;
        this.currentSection = 'landing-page';
        this.popularServices = [
            { id: 'emergency', name: 'Serviços 24Hrs', icon: '🚨', description: 'Emergências que não podem esperar' },
            { id: 'standard', name: 'Buscar Serviços', icon: '🔍', description: 'Encontre profissionais qualificados' },
            { id: 'enterprise', name: 'Grandes Serviços', icon: '🏢', description: 'Projetos empresariais e residenciais' }
        ];
        
        // Generate dynamic professionals data
        this.generateProfessionalsData();
        
        this.init();
    }

    generateProfessionalsData() {
        const names = ['João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Lima', 'Carlos Mendes', 'Roberto Alves', 'Fernanda Oliveira', 'Marcos Pereira', 'Lucia Ferreira', 'Rafael Souza', 'Patricia Lima', 'Antonio Santos'];
        const specialties = ['Eletricista', 'Encanador', 'Chaveiro', 'Limpeza', 'Pintor', 'Pedreiro'];
        const locations = ['Centro, SP', 'Vila Nova, SP', 'Jardins, SP', 'Copacabana, SP', 'Tijuca, SP', 'Botafogo, SP', 'Barra da Tijuca, SP', 'Leblon, SP', 'Ipanema, SP'];
        const priceTypes = [['hour'], ['task'], ['analysis'], ['hour', 'task'], ['hour', 'analysis'], ['task', 'analysis'], ['hour', 'task', 'analysis']];
        
        this.professionalsData = [];
        
        for (let i = 0; i < 12; i++) {
            const name = names[Math.floor(Math.random() * names.length)];
            const specialty = specialties[Math.floor(Math.random() * specialties.length)];
            const location = locations[Math.floor(Math.random() * locations.length)];
            const rating = 4.0 + Math.random() * 1.0;
            const priceType = priceTypes[Math.floor(Math.random() * priceTypes.length)];
            
            let price = '';
            if (priceType.includes('hour')) {
                price = `R$ ${Math.floor(Math.random() * 50) + 50}/hora`;
            } else if (priceType.includes('task')) {
                price = `R$ ${Math.floor(Math.random() * 100) + 30}/tarefa`;
            } else if (priceType.includes('analysis')) {
                price = 'Análise da Necessidade';
            }
            
            this.professionalsData.push({
                id: i + 1,
                name: name,
                specialty: specialty,
                rating: Math.round(rating * 10) / 10,
                location: location,
                price: price,
                priceTypes: priceType,
                avatar: name.split(' ').map(n => n[0]).join(''),
                available: Math.random() > 0.1
            });
        }
    }

    showVisitModal(professional) {
        const modal = document.getElementById('visit-modal');
        const overlay = document.getElementById('modal-overlay');
        if (modal && overlay) {
            document.getElementById('visit-provider-name').textContent = professional.name;
            document.getElementById('visit-service').textContent = professional.specialty;
            
            // Prefill date with tomorrow
            const dateInput = document.getElementById('visit-date');
            if (dateInput) {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                dateInput.value = tomorrow.toISOString().slice(0,10);
            }
            
            overlay.style.display = 'block';
            modal.style.display = 'block';
            
            const form = document.getElementById('visit-form');
            if (form) {
                form.onsubmit = (e) => {
                    e.preventDefault();
                    this.closeAllModals();
                    this.showToast('Solicitação de visita enviada! O prestador entrará em contato para confirmar.', 'success');
                };
            }
        }
    }
    init() {
        this.showLoading();
        this.bindEvents();
        this.loadUserData();
        this.loadPopularServices();
        this.hideLoading();
    }

    showLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }

    hideLoading() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
        }, 1000);
    }

    bindEvents() {
        // Navigation buttons
        document.getElementById('login-btn')?.addEventListener('click', () => this.showLoginChoiceModal());
        document.getElementById('register-btn')?.addEventListener('click', () => this.showRegisterModal());
        document.getElementById('register-client-btn')?.addEventListener('click', () => { 
            console.log('Cadastro Cliente clicado');
            this.showRegisterModal('client'); 
        });
        document.getElementById('register-provider-btn')?.addEventListener('click', () => { 
            console.log('Cadastro Prestador clicado');
            this.showRegisterModal('provider'); 
        });
        document.getElementById('logout-btn')?.addEventListener('click', () => this.logout());
        document.getElementById('client-logout')?.addEventListener('click', () => this.logout());
        document.getElementById('provider-logout')?.addEventListener('click', () => this.logout());
        document.getElementById('back-to-landing')?.addEventListener('click', () => this.navigateToSection('landing-page'));
        document.getElementById('mobile-menu-btn')?.addEventListener('click', () => this.toggleMobileMenu());
        document.getElementById('mobile-overlay')?.addEventListener('click', () => this.toggleMobileMenu());
        document.getElementById('sidebar-toggle')?.addEventListener('click', () => this.toggleSidebar());
        document.getElementById('sidebar-toggle-provider')?.addEventListener('click', () => this.toggleSidebar());

        // Photo upload
        document.getElementById('photo-upload')?.addEventListener('change', (e) => this.handlePhotoUpload(e));

        // Search functionality
        document.getElementById('search-professionals')?.addEventListener('click', () => this.searchProfessionals());

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => this.closeModal(e.target.closest('.modal')));
        });

        // Modal overlay click
        document.getElementById('modal-overlay')?.addEventListener('click', () => this.closeAllModals());

        // Register form steps
        document.getElementById('register-form-step-1')?.addEventListener('submit', (e) => this.handleRegisterStep1(e));
        
        // Login form
        document.getElementById('login-form-element')?.addEventListener('submit', (e) => this.handleLogin(e));
    }

    loadUserData() {
        const userData = localStorage.getItem('chamadoProUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
            this.updateUserInterface();
        }
    }

    updateUserInterface() {
        const loginBtn = document.getElementById('login-btn');
        const registerBtnLegacy = document.getElementById('register-btn'); // pode não existir
        const registerClientBtn = document.getElementById('register-client-btn');
        const registerProviderBtn = document.getElementById('register-provider-btn');
        const userMenu = document.getElementById('user-menu');
        const userName = document.getElementById('user-name');

        if (this.currentUser) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (registerBtnLegacy) registerBtnLegacy.style.display = 'none';
            if (registerClientBtn) registerClientBtn.style.display = 'none';
            if (registerProviderBtn) registerProviderBtn.style.display = 'none';
            if (userMenu) userMenu.style.display = 'flex';
            if (userName) userName.textContent = this.currentUser.name;
            this.showUserDashboard();
        } else {
            if (loginBtn) loginBtn.style.display = 'block';
            if (registerBtnLegacy) registerBtnLegacy.style.display = 'block';
            if (registerClientBtn) registerClientBtn.style.display = 'inline-block';
            if (registerProviderBtn) registerProviderBtn.style.display = 'inline-block';
            if (userMenu) userMenu.style.display = 'none';
        }
    }

    loadPopularServices() {
        // Services are already loaded in constructor
        console.log('Popular services loaded:', this.popularServices);
    }

    handleServiceCardClick(serviceId) {
        this.navigateToSearch(serviceId);
    }

    handleServiceItemClick(serviceId) {
        this.navigateToSearch(serviceId);
    }

    handleActionCardClick(actionId) {
        switch(actionId) {
            case 'emergency':
            case 'standard':
            case 'enterprise':
                this.navigateToSearch(actionId);
                break;
            case 'requests':
                this.showUserRequests();
                break;
            default:
                console.log('Action clicked:', actionId);
        }
    }

    navigateToSearch(serviceType = 'standard') {
        this.navigateToSection('search-section');
        
        // Update search title based on service type
        const searchTitle = document.getElementById('search-title');
        const serviceNames = {
            'emergency': 'Serviços 24Hrs - Emergências',
            'standard': 'Buscar Serviços',
            'enterprise': 'Grandes Serviços - Empresarial'
        };
        
        if (searchTitle) {
            searchTitle.textContent = serviceNames[serviceType] || 'Buscar Profissionais';
        }
        
        // Load professionals
        this.loadProfessionals();
    }

    navigateToSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
        }
    }

    showSection(sectionId) {
        this.navigateToSection(sectionId);
    }

    showUserDashboard() {
        if (!this.currentUser) return;
        
        if (this.currentUser.type === 'client') {
            this.navigateToSection('client-dashboard');
            // client-name element doesn't exist, so we skip it
        } else if (this.currentUser.type === 'provider') {
            this.navigateToSection('provider-dashboard');
            // provider-name element doesn't exist, so we skip it
        }
    }

    loadProfessionals(serviceType = '', priceType = '', ratingMin = 0, availability = 'any') {
        const professionalsList = document.getElementById('professionals-list');
        if (!professionalsList) return;

        // Clear list first
        professionalsList.innerHTML = '';

        // If no search criteria, show empty state
        if (!serviceType && !priceType && !ratingMin) {
            return;
        }

        // Filter professionals based on criteria
        let filteredProfessionals = this.professionalsData;
        
        if (serviceType) {
            const serviceMap = {
                'eletricista': 'Eletricista',
                'encanador': 'Encanador', 
                'chaveiro': 'Chaveiro',
                'limpeza': 'Limpeza',
                'pintor': 'Pintor',
                'pedreiro': 'Pedreiro'
            };
            const specialtyName = serviceMap[serviceType];
            if (specialtyName) {
                filteredProfessionals = filteredProfessionals.filter(p => p.specialty === specialtyName);
            }
        }
        
        if (priceType) {
            filteredProfessionals = filteredProfessionals.filter(p => p.priceTypes.includes(priceType));
        }
        if (ratingMin) {
            filteredProfessionals = filteredProfessionals.filter(p => p.rating >= ratingMin);
        }

        filteredProfessionals.forEach(professional => {
            const professionalCard = document.createElement('div');
            professionalCard.className = 'professional-card';
            
            professionalCard.innerHTML = `
                <div class="professional-avatar">${professional.avatar}</div>
                <div class="professional-info">
                    <div class="professional-name">${professional.name}</div>
                    <div class="professional-specialty">${professional.specialty}</div>
                    <div class="professional-rating">
                        <span class="stars">⭐</span>
                        <span>${professional.rating}</span>
                    </div>
                    <div class="professional-location">📍 ${professional.location}</div>
                </div>
                <div class="professional-price">${professional.price}</div>
                <div class="professional-actions">
                    <button class="btn btn-outline btn-sm" onclick="app.contactProfessional(${professional.id}, 'standard')">
                        Orçamento Padrão
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="app.contactProfessional(${professional.id}, 'visit')">
                        Orçamento com Visita
                    </button>
                </div>
            `;
            
            professionalsList.appendChild(professionalCard);
        });
    }

    contactProfessional(professionalId, budgetType) {
        const professional = this.professionalsData.find(p => p.id === professionalId);
        if (!professional) return;

        // Check if user is logged in
        if (!this.currentUser) {
            // Store pending service request
            const pendingRequest = {
                professionalId,
                professional,
                budgetType,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('chamadoProPendingRequest', JSON.stringify(pendingRequest));
            
            // Open minimal client auth prompt (Enter or Register)
            this.showClientAuthPrompt();
            return;
        }

        // User is logged in
        if (budgetType === 'visit') {
            this.showVisitModal(professional);
        } else {
            this.showPaymentModal(professional, budgetType);
        }
    }

    handlePhotoUpload(event) {
        const files = event.target.files;
        const preview = document.getElementById('photo-preview');
        
        if (!preview) return;
        
        preview.innerHTML = '';
        
        Array.from(files).slice(0, 3).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.cursor = 'pointer';
                    img.onclick = () => this.removePhoto(img);
                    preview.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    removePhoto(imgElement) {
        imgElement.remove();
    }

    showLoginModal() {
        const modal = document.getElementById('login-modal');
        const overlay = document.getElementById('modal-overlay');
        
        if (modal && overlay) {
            overlay.style.display = 'block';
            modal.style.display = 'block';
        }
    }

    openLoginFor(userType) {
        const modal = document.getElementById('login-modal');
        const overlay = document.getElementById('modal-overlay');
        const loginForm = document.getElementById('login-form');
        const loginChoice = document.querySelector('.login-choice');
        
        if (modal && overlay && loginForm && loginChoice) {
            // Force login form and set type
            loginChoice.style.display = 'none';
            loginForm.style.display = 'block';
            loginForm.dataset.userType = userType;
            
            // Clear fields
            const emailEl = document.getElementById('login-email');
            const passEl = document.getElementById('login-password');
            if (emailEl) emailEl.value = '';
            if (passEl) passEl.value = '';
            
            overlay.style.display = 'block';
            modal.style.display = 'block';
        } else {
            // fallback
            this.showLoginModal();
        }
    }

    showRegisterModal(userType = 'client') {
        console.log('showRegisterModal chamada para:', userType);
        const modal = document.getElementById('register-modal');
        const overlay = document.getElementById('modal-overlay');
        
        console.log('Modal encontrado:', modal);
        console.log('Overlay encontrado:', overlay);
        
        if (modal && overlay) {
            overlay.style.display = 'block';
            modal.style.display = 'block';
            this.resetRegisterForm();
            this.selectRegisterUserType(userType);
            console.log('Modal exibido para:', userType);
        } else {
            console.error('Modal ou overlay não encontrado');
        }
    }

    showLoginChoiceModal() {
        const modal = document.getElementById('login-modal');
        const overlay = document.getElementById('modal-overlay');
        
        if (modal && overlay) {
            // Reset login form to show choice screen
            const loginForm = document.getElementById('login-form');
            const loginChoice = document.querySelector('.login-choice');
            
            if (loginForm && loginChoice) {
                loginForm.style.display = 'none';
                loginChoice.style.display = 'flex';
            }
            
            overlay.style.display = 'block';
            modal.style.display = 'block';
        }
    }

    showRegisterForm() {
        // Close login modal and open register modal
        this.closeAllModals();
        this.showRegisterModal();
    }

    showPaymentModal(professional, budgetType) {
        const modal = document.getElementById('payment-modal');
        const overlay = document.getElementById('modal-overlay');
        
        if (modal && overlay) {
            // Update payment modal content
            document.getElementById('payment-provider-name').textContent = professional.name;
            document.getElementById('payment-service').textContent = professional.specialty;
            document.getElementById('payment-value').textContent = budgetType === 'visit' ? 'R$ 15,00' : professional.price;
            document.getElementById('payment-type').textContent = budgetType === 'visit' ? 'Orçamento com Visita' : 'Orçamento Padrão';
            // Breakdown logic: visita = taxa fixa, padrão = mostra taxa 5%
            const breakdown = document.getElementById('payment-breakdown');
            if (budgetType === 'visit') {
                breakdown.style.display = 'none';
                document.getElementById('payment-note').textContent = 'Pagamento apenas após a execução, combinado diretamente com o prestador.';
            } else {
                breakdown.style.display = 'block';
                // Attempt to parse price numbers
                const priceText = professional.price.replace(/[^0-9,]/g, '').replace(',', '.');
                const base = parseFloat(priceText) || 0;
                const fee = (base * 0.05); // oculto para o cliente no texto
                const total = base;
                document.getElementById('breakdown-subtotal').textContent = `R$ ${base.toFixed(2).replace('.', ',')}`;
                document.getElementById('breakdown-fee').textContent = `R$ ${fee.toFixed(2).replace('.', ',')}`;
                document.getElementById('breakdown-total').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
                document.getElementById('payment-note').textContent = 'Pagamento protegido (escrow)';
            }
            
            overlay.style.display = 'block';
            modal.style.display = 'block';
        }
    }

    showClientAuthPrompt() {
        const modal = document.getElementById('client-auth-modal');
        const overlay = document.getElementById('modal-overlay');
        if (modal && overlay) {
            overlay.style.display = 'block';
            modal.style.display = 'block';
        }
    }

    closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            document.getElementById('modal-overlay').style.display = 'none';
        }
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        document.getElementById('modal-overlay').style.display = 'none';
    }

    openClientLogin() {
        // Close client prompt and open login pre-set to client
        this.closeAllModals();
        this.openLoginFor('client');
    }

    openClientRegister() {
        // Close client prompt and open register
        this.closeAllModals();
        this.showRegisterModal();
    }

    showLoginForm(userType) {
        const loginForm = document.getElementById('login-form');
        const loginChoice = document.querySelector('.login-choice');
        
        if (loginForm && loginChoice) {
            loginChoice.style.display = 'none';
            loginForm.style.display = 'block';
            
            // Store user type for login
            loginForm.dataset.userType = userType;
            
            // Clear any previous form data
            document.getElementById('login-email').value = '';
            document.getElementById('login-password').value = '';
        }
    }

    handleLogin(event) {
        event.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const userType = document.getElementById('login-form').dataset.userType;
        
        // Simple validation (in real app, this would be API call)
        if (email && password) {
            // Default access for both roles
            const testUsers = {
                'client': { email: 'teste@chamadopro.com.br', password: '123' },
                'provider': { email: 'teste@chamadopro.com.br', password: '123' }
            };
            
            const testUser = testUsers[userType];
            if (testUser && email === testUser.email && password === testUser.password) {
                // Login successful
                this.currentUser = {
                    type: userType,
                    name: userType === 'client' ? 'Cliente Teste' : 'Prestador Teste',
                    email: 'teste@chamadopro.com.br'
                };
                
                localStorage.setItem('chamadoProUser', JSON.stringify(this.currentUser));
                
                this.closeAllModals();
                this.updateUserInterface();
                
                // Check for pending service request
                this.processPendingServiceRequest();
                
                this.showToast('Login realizado com sucesso!', 'success');
            } else {
                this.showToast('Email ou senha incorretos!', 'error');
            }
        }
    }

    processPendingServiceRequest() {
        const pendingRequest = localStorage.getItem('chamadoProPendingRequest');
        if (pendingRequest) {
            const request = JSON.parse(pendingRequest);
            localStorage.removeItem('chamadoProPendingRequest');
            
            // Resume correct flow
            if (request.budgetType === 'visit') {
                this.showVisitModal(request.professional);
            } else {
                this.showPaymentModal(request.professional, request.budgetType);
            }
        }
    }

    handleRegisterStep1(event) {
        event.preventDefault();
        
        const formData = {
            name: document.getElementById('register-name').value,
            email: document.getElementById('register-email').value,
            phone: document.getElementById('register-phone').value,
            address: document.getElementById('register-address').value,
            password: document.getElementById('register-password').value
        };
        
        // Validate form
        if (this.validateRegisterStep1(formData)) {
            // Store form data and move to step 2
            localStorage.setItem('chamadoProRegisterData', JSON.stringify(formData));
            this.nextRegisterStep();
        }
    }

    validateRegisterStep1(formData) {
        if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.password) {
            this.showToast('Todos os campos são obrigatórios!', 'error');
            return false;
        }
        
        if (formData.password.length < 6) {
            this.showToast('A senha deve ter pelo menos 6 caracteres!', 'error');
            return false;
        }
        
        return true;
    }

    nextRegisterStep() {
        this.switchRegisterStep(2);
    }

    prevRegisterStep() {
        const currentStep = document.querySelector('.register-step.active');
        const currentStepNumber = parseInt(currentStep.id.split('-')[2]);
        
        if (currentStepNumber > 1) {
            this.switchRegisterStep(currentStepNumber - 1);
        }
    }

    switchRegisterStep(stepNumber) {
        // Hide all steps
        document.querySelectorAll('.register-step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Show target step
        const targetStep = document.getElementById(`register-step-${stepNumber}`);
        if (targetStep) {
            targetStep.classList.add('active');
        }
        
        // Update step indicator
        document.querySelectorAll('.step').forEach((step, index) => {
            step.classList.toggle('active', index + 1 <= stepNumber);
        });
        
        // Update summary if on step 3
        if (stepNumber === 3) {
            this.updateRegisterSummary();
        }
    }

    updateRegisterSummary() {
        const formData = JSON.parse(localStorage.getItem('chamadoProRegisterData') || '{}');
        
        document.getElementById('summary-name').textContent = formData.name || '';
        document.getElementById('summary-email').textContent = formData.email || '';
        document.getElementById('summary-phone').textContent = formData.phone || '';
        
        // Get selected payment methods (client)
        const selectedPayments = Array.from(document.querySelectorAll('input[name="payment-methods"]:checked'))
            .map(input => ({
                pix: 'PIX',
                credit: 'Cartão de Crédito',
                debit: 'Cartão de Débito',
                wallet: 'Carteira ChamadoPro'
            }[input.value]));
        document.getElementById('summary-payments').textContent = selectedPayments.join(', ') || '—';

        // Provider specialties and receiving summary
        const isProvider = this.registerType === 'provider';
        const specRow = document.getElementById('summary-specialties-row');
        const recvRow = document.getElementById('summary-receiving-row');
        if (specRow) specRow.style.display = isProvider ? 'flex' : 'none';
        if (recvRow) recvRow.style.display = isProvider ? 'flex' : 'none';
        if (isProvider) {
            const specialties = Array.from(document.querySelectorAll('input[name="specialties"]:checked'))
                .map(i => i.parentElement.textContent.trim());
            document.getElementById('summary-specialties').textContent = specialties.join(', ') || '—';
            
            const priceTypes = Array.from(document.querySelectorAll('input[name="price-types"]:checked'))
                .map(i => {
                    const labels = {
                        'hour': 'Por Hora',
                        'task': 'Por Tarefa', 
                        'analysis': 'Análise da Necessidade'
                    };
                    return labels[i.value];
                });
            const priceTypesText = priceTypes.join(', ') || '—';
            
            const pixKey = document.getElementById('pix-key')?.value || '—';
            const bank = document.getElementById('bank-name')?.value || '';
            const acc = document.getElementById('bank-account')?.value || '';
            document.getElementById('summary-receiving').textContent = `Tipos: ${priceTypesText} | PIX: ${pixKey} ${bank && acc ? `| ${bank} ${acc}` : ''}`.trim();
        }
    }

    confirmRegistration() {
        const acceptTerms = document.getElementById('accept-terms').checked;
        
        if (!acceptTerms) {
            this.showToast('Você deve aceitar os termos de uso!', 'error');
            return;
        }
        
        // Registration successful
        const formData = JSON.parse(localStorage.getItem('chamadoProRegisterData') || '{}');
        
        this.currentUser = {
            type: this.registerType === 'provider' ? 'provider' : 'client',
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address
        };
        
        localStorage.setItem('chamadoProUser', JSON.stringify(this.currentUser));
        localStorage.removeItem('chamadoProRegisterData');
        
        this.closeAllModals();
        this.updateUserInterface();
        
        this.showToast('Cadastro realizado com sucesso!', 'success');
    }

    resetRegisterForm() {
        // Reset form to step 1
        this.switchRegisterStep(1);
        
        // Clear form data
        document.getElementById('register-form-step-1').reset();
        document.querySelectorAll('input[name="payment-methods"]').forEach(input => {
            input.checked = false;
        });
        document.getElementById('accept-terms').checked = false;
        
        // Clear stored data
        localStorage.removeItem('chamadoProRegisterData');
    }

    selectRegisterUserType(type) {
        // Save selection
        this.registerType = type; // 'client' or 'provider'
        
        // Hide/show choice buttons based on how modal was opened
        const choiceContainer = document.querySelector('.register-choice');
        const btnClient = document.getElementById('register-type-client');
        const btnProvider = document.getElementById('register-type-provider');
        
        // If type is pre-selected (from header buttons), hide choice
        if (type === 'client' || type === 'provider') {
            if (choiceContainer) choiceContainer.style.display = 'none';
            if (btnClient) btnClient.style.display = 'none';
            if (btnProvider) btnProvider.style.display = 'none';
        } else {
            if (choiceContainer) choiceContainer.style.display = 'flex';
            if (btnClient) btnClient.style.display = 'block';
            if (btnProvider) btnProvider.style.display = 'block';
        }
        
        // Highlight choice
        if (btnClient && btnProvider) {
            btnClient.classList.toggle('active', type === 'client');
            btnProvider.classList.toggle('active', type === 'provider');
        }
        
        // Toggle provider fields
        const providerDocRow = document.getElementById('provider-doc-id');
        const step2Client = document.getElementById('step-2-client');
        const step2Provider = document.getElementById('step-2-provider');
        if (providerDocRow) providerDocRow.style.display = type === 'provider' ? 'block' : 'none';
        if (step2Client) step2Client.style.display = type === 'client' ? 'block' : 'none';
        if (step2Provider) step2Provider.style.display = type === 'provider' ? 'block' : 'none';
    }

    processPayment() {
        const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
        const paymentType = document.getElementById('payment-type').textContent;
        
        // Simulate payment processing
        this.showToast('Processando pagamento...', 'info');
        
        setTimeout(() => {
            this.closeAllModals();
            this.showToast('Pagamento realizado com sucesso!', 'success');
            
            // Navigate to appropriate dashboard
            if (this.currentUser) {
                this.showUserDashboard();
            } else {
                this.navigateToSection('landing-page');
            }
        }, 2000);
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('chamadoProUser');
        localStorage.removeItem('chamadoProPendingRequest');
        
        this.updateUserInterface();
        this.navigateToSection('landing-page');
        
        this.showToast('Logout realizado com sucesso!', 'success');
    }

    toggleMobileMenu() {
        const drawer = document.getElementById('mobile-nav');
        const overlay = document.getElementById('mobile-overlay');
        if (!drawer || !overlay) return;
        const isClosed = drawer.style.display === 'none' || drawer.style.display === '';
        if (isClosed) {
            drawer.style.display = 'flex';
            overlay.style.display = 'block';
            setTimeout(() => drawer.classList.add('open'), 10);
        } else {
            drawer.classList.remove('open');
            setTimeout(() => {
                drawer.style.display = 'none';
                overlay.style.display = 'none';
            }, 250);
        }
    }

    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar-menu');
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
    }

    searchProfessionals() {
        // Map search text to serviceType
        const searchText = (document.getElementById('service-search')?.value || '').toLowerCase();
        let serviceType = '';
        if (searchText) {
            const map = { eletricista:'eletricista', encanador:'encanador', chaveiro:'chaveiro', limpeza:'limpeza', pintor:'pintor', pedreiro:'pedreiro' };
            serviceType = map[searchText] || '';
        }
        const location = document.getElementById('location').value;
        const budgetType = document.querySelector('input[name="budget-type"]:checked').value;
        const priceType = document.getElementById('price-type').value;
        const ratingMin = parseFloat(document.getElementById('rating-min')?.value || '0');
        const availability = document.getElementById('availability')?.value || 'any';
        
        if (!serviceType) {
            this.showToast('Selecione o tipo de serviço!', 'error');
            return;
        }
        
        // Filter professionals based on search criteria
        this.loadProfessionals(serviceType, priceType, ratingMin, availability);
        this.showToast('Buscando profissionais...', 'info');
    }

    showToast(message, type = 'info') {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Style the toast
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;
        
        // Set background color based on type
        const colors = {
            'success': '#28a745',
            'error': '#dc3545',
            'info': '#17a2b8',
            'warning': '#ffc107'
        };
        toast.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Placeholder methods for future functionality
    showUserRequests() {
        this.showToast('Funcionalidade em desenvolvimento: Minhas Solicitações', 'info');
    }

    showApprovedQuotes() {
        this.showToast('Funcionalidade em desenvolvimento: Orçamentos Aprovados', 'info');
    }

    showScheduledVisits() {
        this.showToast('Funcionalidade em desenvolvimento: Visitas Marcadas', 'info');
    }

    showServiceHistory() {
        this.showToast('Funcionalidade em desenvolvimento: Histórico de Trabalhos', 'info');
    }

    showActiveServices() {
        this.showToast('Funcionalidade em desenvolvimento: Serviços Ativos', 'info');
    }

    showReceivedQuotes() {
        this.showToast('Funcionalidade em desenvolvimento: Orçamentos Recebidos', 'info');
    }

    showSentProposals() {
        this.showToast('Funcionalidade em desenvolvimento: Propostas Enviadas', 'info');
    }

    showRejectedQuotes() {
        this.showToast('Funcionalidade em desenvolvimento: Orçamentos Recusados', 'info');
    }

    showEarnings() {
        this.showToast('Funcionalidade em desenvolvimento: Ganhos', 'info');
    }

    showSpecialties() {
        this.showToast('Funcionalidade em desenvolvimento: Especialidades', 'info');
    }

    showCalendar() {
        this.showToast('Funcionalidade em desenvolvimento: Calendário', 'info');
    }

    showHowItWorks() {
        this.showToast('Funcionalidade em desenvolvimento: Como Funciona', 'info');
    }

    showAbout() {
        this.showToast('Funcionalidade em desenvolvimento: Sobre Nós', 'info');
    }

    showTerms() {
        this.showToast('Funcionalidade em desenvolvimento: Termos de Uso', 'info');
    }

    showPrivacy() {
        this.showToast('Funcionalidade em desenvolvimento: Política de Privacidade', 'info');
    }
}

// Global functions for onclick handlers
function navigateToSearch(serviceType) {
    if (window.app) {
        window.app.navigateToSearch(serviceType);
    }
}

function showUserRequests() {
    if (window.app) {
        window.app.showUserRequests();
    }
}

function showApprovedQuotes() {
    if (window.app) {
        window.app.showApprovedQuotes();
    }
}

function showScheduledVisits() {
    if (window.app) {
        window.app.showScheduledVisits();
    }
}

function showServiceHistory() {
    if (window.app) {
        window.app.showServiceHistory();
    }
}

function showActiveServices() {
    if (window.app) {
        window.app.showActiveServices();
    }
}

function showReceivedQuotes() {
    if (window.app) {
        window.app.showReceivedQuotes();
    }
}

function showSentProposals() {
    if (window.app) {
        window.app.showSentProposals();
    }
}

function showRejectedQuotes() {
    if (window.app) {
        window.app.showRejectedQuotes();
    }
}

function showEarnings() {
    if (window.app) {
        window.app.showEarnings();
    }
}

function showSpecialties() {
    if (window.app) {
        window.app.showSpecialties();
    }
}

function showCalendar() {
    if (window.app) {
        window.app.showCalendar();
    }
}

function showHowItWorks() {
    if (window.app) {
        window.app.showHowItWorks();
    }
}

function showAbout() {
    if (window.app) {
        window.app.showAbout();
    }
}

function showTerms() {
    if (window.app) {
        window.app.showTerms();
    }
}

function showPrivacy() {
    if (window.app) {
        window.app.showPrivacy();
    }
}

function showLoginForm(userType) {
    if (window.app) {
        window.app.showLoginForm(userType);
    }
}

function openClientLogin() {
    if (window.app) {
        window.app.openClientLogin();
    }
}

function openClientRegister() {
    if (window.app) {
        window.app.openClientRegister();
    }
}

function showRegisterForm() {
    if (window.app) {
        window.app.showRegisterForm();
    }
}

function nextRegisterStep() {
    if (window.app) {
        window.app.nextRegisterStep();
    }
}

function prevRegisterStep() {
    if (window.app) {
        window.app.prevRegisterStep();
    }
}

function selectRegisterUserType(type) {
    if (window.app) {
        window.app.selectRegisterUserType(type);
    }
}

function confirmRegistration() {
    if (window.app) {
        window.app.confirmRegistration();
    }
}

function processPayment() {
    if (window.app) {
        window.app.processPayment();
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ChamadoProApp();
});

// Add CSS animations for toasts
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
