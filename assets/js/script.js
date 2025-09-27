// ChamadoPro Application JavaScript
class ChamadoProApp {
    constructor() {
        this.currentUser = null;
        this.isLoading = false;
        this.currentSection = 'landing-page';
        this.currentServiceType = 'standard';
        
        // Mock data for provider dashboard
        this.providerData = {
            receivedQuotes: [
                {
                    id: 1,
                    clientName: "Maria Silva",
                    service: "Encanador",
                    description: "Vazamento na pia da cozinha",
                    location: "Centro, São Paulo",
                    budget: "R$ 150 - R$ 200",
                    date: "2024-01-15",
                    status: "pending",
                    photos: ["kitchen_leak.jpg"]
                },
                {
                    id: 2,
                    clientName: "João Santos",
                    service: "Eletricista",
                    description: "Instalação de ventilador",
                    location: "Vila Madalena, São Paulo",
                    budget: "R$ 80 - R$ 120",
                    date: "2024-01-14",
                    status: "pending",
                    photos: ["fan_installation.jpg"]
                }
            ],
            sentProposals: [
                {
                    id: 1,
                    clientName: "Ana Costa",
                    service: "Encanador",
                    proposal: "R$ 180",
                    date: "2024-01-13",
                    status: "waiting"
                }
            ],
            approvedQuotes: [
                {
                    id: 1,
                    clientName: "Carlos Lima",
                    service: "Eletricista",
                    amount: "R$ 250",
                    date: "2024-01-12",
                    status: "approved"
                }
            ],
            activeServices: [
                {
                    id: 1,
                    clientName: "Pedro Oliveira",
                    service: "Encanador",
                    description: "Troca de torneira",
                    startDate: "2024-01-16",
                    estimatedEnd: "2024-01-16",
                    status: "in_progress"
                }
            ],
            serviceHistory: [
                {
                    id: 1,
                    clientName: "Lucia Ferreira",
                    service: "Eletricista",
                    amount: "R$ 180",
                    date: "2024-01-10",
                    rating: 5,
                    status: "completed"
                },
                {
                    id: 2,
                    clientName: "Roberto Alves",
                    service: "Encanador",
                    amount: "R$ 320",
                    date: "2024-01-08",
                    rating: 4,
                    status: "completed"
                }
            ],
            specialties: [
                {
                    id: 1,
                    name: "Encanador Residencial",
                    description: "Reparos e instalações hidráulicas residenciais",
                    icon: "🔧",
                    basePrice: 120.00,
                    rating: 4.8,
                    completedJobs: 45,
                    status: "active",
                    tags: ["Reparo", "Instalação", "Emergência"]
                },
                {
                    id: 2,
                    name: "Eletricista Residencial",
                    description: "Instalações e reparos elétricos residenciais",
                    icon: "⚡",
                    basePrice: 150.00,
                    rating: 4.9,
                    completedJobs: 32,
                    status: "active",
                    tags: ["Instalação", "Reparo", "Manutenção"]
                },
                {
                    id: 3,
                    name: "Limpeza Residencial",
                    description: "Limpeza completa de residências",
                    icon: "🧹",
                    basePrice: 80.00,
                    rating: 4.7,
                    completedJobs: 28,
                    status: "inactive",
                    tags: ["Residencial", "Comercial", "Pós-obra"]
                }
            ],
            earnings: {
                thisMonth: 1250.00,
                lastMonth: 2100.00,
                total: 15800.00,
                pending: 180.00
            },
            calendar: [
                {
                    date: "2024-01-16",
                    services: [
                        { time: "09:00", client: "Pedro Oliveira", service: "Troca de torneira", status: "confirmed" },
                        { time: "14:00", client: "Maria Silva", service: "Vazamento pia", status: "pending" }
                    ]
                },
                {
                    date: "2024-01-17",
                    services: [
                        { time: "10:00", client: "João Santos", service: "Instalação ventilador", status: "pending" }
                    ]
                }
            ]
        };
        
        this.popularServices = [
            { id: 'emergency', name: 'Serviços 24Hrs', icon: '🚨', description: 'Emergências que não podem esperar' },
            { id: 'standard', name: 'Buscar Serviços', icon: '🔍', description: 'Encontre profissionais qualificados' },
            { id: 'enterprise', name: 'Grandes Serviços', icon: '🏢', description: 'Projetos empresariais e residenciais' }
        ];
        
        this.professionalsData = [
            {
                id: 1,
                name: 'João Silva',
                specialty: 'Eletricista',
                rating: 4.8,
                location: 'Centro, SP',
                price: 'R$ 80/hora',
                priceTypes: ['hour', 'task'],
                avatar: 'JS',
                available: true
            },
            {
                id: 2,
                name: 'Maria Santos',
                specialty: 'Encanadora',
                rating: 4.9,
                location: 'Vila Nova, SP',
                price: 'R$ 70/hora',
                priceTypes: ['hour', 'analysis'],
                avatar: 'MS',
                available: true
            },
            {
                id: 3,
                name: 'Pedro Costa',
                specialty: 'Chaveiro',
                rating: 4.7,
                location: 'Jardins, SP',
                price: 'R$ 50/chamada',
                priceTypes: ['task'],
                avatar: 'PC',
                available: true
            },
            {
                id: 4,
                name: 'Ana Lima',
                specialty: 'Limpeza',
                rating: 4.9,
                location: 'Copacabana, SP',
                price: 'R$ 60/hora',
                priceTypes: ['hour', 'task', 'analysis'],
                avatar: 'AL',
                available: true
            },
            {
                id: 5,
                name: 'Carlos Mendes',
                specialty: 'Pintor',
                rating: 4.6,
                location: 'Tijuca, SP',
                price: 'R$ 45/m²',
                priceTypes: ['task', 'analysis'],
                avatar: 'CM',
                available: true
            },
            {
                id: 6,
                name: 'Roberto Alves',
                specialty: 'Pedreiro',
                rating: 4.8,
                location: 'Botafogo, SP',
                price: 'R$ 90/hora',
                priceTypes: ['hour', 'task'],
                avatar: 'RA',
                available: true
            },
            {
                id: 7,
                name: 'Fernanda Oliveira',
                specialty: 'Eletricista',
                rating: 4.5,
                location: 'Barra da Tijuca, SP',
                price: 'Análise da Necessidade',
                priceTypes: ['analysis'],
                avatar: 'FO',
                available: true
            },
            {
                id: 8,
                name: 'Marcos Pereira',
                specialty: 'Encanador',
                rating: 4.7,
                location: 'Leblon, SP',
                price: 'Todas as opções',
                priceTypes: ['hour', 'task', 'analysis'],
                avatar: 'MP',
                available: true
            },
            {
                id: 9,
                name: 'Lucia Ferreira',
                specialty: 'Pintora',
                rating: 4.4,
                location: 'Ipanema, SP',
                price: 'Não informado',
                priceTypes: [],
                avatar: 'LF',
                available: true
            }
        ];
        
        this.init();
    }

    showVisitModal(professional) {
        const modal = document.getElementById('visit-modal');
        const overlay = document.getElementById('modal-overlay');
        if (modal && overlay) {
            this.showToast('Dica: adicione fotos para o prestador entender melhor a necessidade.', 'info');
            // Reset previews e habilita DnD
            this.resetPhotoArea('visit');
            this.enableUploadDnd('visit-upload-area','visit-photo-input','visit');
            const visitProviderName = document.getElementById('visit-provider-name');
            const visitService = document.getElementById('visit-service');
            if (visitProviderName) visitProviderName.textContent = professional.name;
            if (visitService) visitService.textContent = professional.specialty;
            
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
                    // Persist visit request with photos
                    try {
                        const images = Array.from(document.querySelectorAll('#visit-photo-preview img')).map(img => img.src);
                        const notes = document.getElementById('visit-notes')?.value || '';
                        const existing = JSON.parse(localStorage.getItem('chamadoProRequests') || '[]');
                        existing.push({ createdAt: new Date().toISOString(), type: 'Orçamento com Visita', photos: images, notes });
                        localStorage.setItem('chamadoProRequests', JSON.stringify(existing));
                    } catch(_) {}
                };
            }
        }
    }
    init() {
        this.showLoading();
        this.bindEvents();
        this.loadUserData();
        this.loadPopularServices();
        // Enable drag-and-drop for toolbar photo upload
        this.enableUploadDnd('st-upload-area', 'st-photo-input', 'toolbar');
        // Initialize budget type selection
        this.selectBudgetType('standard');
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
        document.getElementById('drawer-login')?.addEventListener('click', () => {
            this.closeDrawer();
            this.showLoginChoiceModal();
        });
        document.getElementById('register-client-btn')?.addEventListener('click', () => { 
            console.log('Cadastro Cliente clicado');
            this.showInitialRegisterModal('client'); 
        });
        document.getElementById('register-provider-btn')?.addEventListener('click', () => { 
            console.log('Cadastro Prestador clicado');
            this.showInitialRegisterModal('provider'); 
        });
        document.getElementById('drawer-register-client')?.addEventListener('click', () => { 
            console.log('Cadastro Cliente Mobile clicado');
            this.closeDrawer();
            this.showInitialRegisterModal('client'); 
        });
        document.getElementById('drawer-register-provider')?.addEventListener('click', () => { 
            console.log('Cadastro Prestador Mobile clicado');
            this.closeDrawer();
            this.showInitialRegisterModal('provider'); 
        });
        document.getElementById('logout-btn')?.addEventListener('click', () => this.logout());
        document.getElementById('client-logout')?.addEventListener('click', () => this.logout());
        document.getElementById('provider-logout')?.addEventListener('click', () => this.logout());
        document.getElementById('mobile-menu-btn')?.addEventListener('click', () => this.toggleMobileMenu());
        document.getElementById('mobile-overlay')?.addEventListener('click', () => this.toggleMobileMenu());
        
        // Back button with fallback
        document.getElementById('back-to-landing')?.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Back button clicked. Current section:', this.currentSection);
            this.goBack();
        });
        
        // Touch events for mobile
        this.initTouchEvents();

        // Photo upload
        document.getElementById('photo-upload')?.addEventListener('change', (e) => this.handlePhotoUpload(e));
        document.getElementById('payment-photo-input')?.addEventListener('change', (e) => this.handlePhotoUpload(e, 'payment'));
        document.getElementById('visit-photo-input')?.addEventListener('change', (e) => this.handlePhotoUpload(e, 'visit'));
        document.getElementById('st-photo-input')?.addEventListener('change', (e) => this.handlePhotoUpload(e, 'toolbar'));

        // Search functionality
        document.getElementById('search-professionals')?.addEventListener('click', () => this.searchProfessionals());
        document.getElementById('clear-filters-btn')?.addEventListener('click', () => this.clearFilters());
        document.getElementById('new-filter-btn')?.addEventListener('click', () => this.newFilter());
        document.getElementById('submit-request')?.addEventListener('click', () => this.submitRequest());
        
        // Budget type selection
        document.getElementById('btn-budget-standard')?.addEventListener('click', () => this.selectBudgetType('standard'));
        document.getElementById('btn-budget-visit')?.addEventListener('click', () => this.selectBudgetType('visit'));
        
        // Initial registration form
        document.getElementById('initial-register-form-element')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleInitialRegistration();
        });
        
        // Provider sidebar toggle
        document.getElementById('sidebar-toggle-provider')?.addEventListener('click', () => this.toggleProviderSidebar());
        document.getElementById('sidebar-overlay')?.addEventListener('click', () => this.closeProviderSidebar());
        
        // Client sidebar toggle
        document.getElementById('sidebar-toggle-client')?.addEventListener('click', () => this.toggleClientSidebar());
        document.getElementById('client-sidebar-overlay')?.addEventListener('click', () => this.closeClientSidebar());

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
        const registerClientBtn = document.getElementById('register-client-btn');
        const registerProviderBtn = document.getElementById('register-provider-btn');
        const userMenu = document.getElementById('user-menu');
        const userName = document.getElementById('user-name');

        if (this.currentUser) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (registerClientBtn) registerClientBtn.style.display = 'none';
            if (registerProviderBtn) registerProviderBtn.style.display = 'none';
            if (userMenu) userMenu.style.display = 'flex';
            if (userName) userName.textContent = this.currentUser.name;
            this.showUserDashboard();
            this.updateRequestsCounter();
            
            // Update provider dashboard counters if user is provider
            if (this.currentUser.type === 'provider') {
                this.updateProviderDashboardCounters();
            }
        } else {
            if (loginBtn) loginBtn.style.display = 'block';
            if (registerClientBtn) registerClientBtn.style.display = 'inline-block';
            if (registerProviderBtn) registerProviderBtn.style.display = 'inline-block';
            if (userMenu) userMenu.style.display = 'none';
        }
    }

    updateRequestsCounter() {
        const countEl = document.getElementById('pending-requests');
        if (!countEl) return;
        try {
            const total = (JSON.parse(localStorage.getItem('chamadoProRequests') || '[]') || []).length;
            countEl.textContent = `${total} em aberto`;
        } catch(_) {}
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

    updateProviderDashboardCounters() {
        const data = this.providerData;
        
        // Update counters
        const newQuotes = data.receivedQuotes.filter(q => q.status === 'pending').length;
        const sentProposals = data.sentProposals.length;
        const approvedQuotes = data.approvedQuotes.length;
        const activeServices = data.activeServices.length;
        
        // Update DOM elements
        const receivedCount = document.querySelector('#provider-dashboard .summary-card:nth-child(1) .count');
        const sentCount = document.querySelector('#provider-dashboard .summary-card:nth-child(2) .count');
        const approvedCount = document.querySelector('#provider-dashboard .summary-card:nth-child(3) .count');
        const activeCount = document.querySelector('#provider-dashboard .summary-card:nth-child(4) .count');
        
        if (receivedCount) receivedCount.textContent = `${newQuotes} novos`;
        if (sentCount) sentCount.textContent = `${sentProposals} enviadas`;
        if (approvedCount) approvedCount.textContent = `${approvedQuotes} aprovados`;
        if (activeCount) activeCount.textContent = `${activeServices} ativos`;
    }

    showProviderModal(title, content) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('provider-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'provider-modal';
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content modal-lg">
                    <div class="modal-header">
                        <h3 id="provider-modal-title"></h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body" id="provider-modal-body">
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Add close functionality
            modal.querySelector('.modal-close').addEventListener('click', () => {
                modal.style.display = 'none';
            });
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
        
        // Update modal content
        modal.querySelector('#provider-modal-title').textContent = title;
        modal.querySelector('#provider-modal-body').innerHTML = content;
        
        // Show modal
        modal.style.display = 'block';
    }

    createReceivedQuotesContent() {
        const quotes = this.providerData.receivedQuotes;
        if (quotes.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-icon">📥</div>
                    <h4>Nenhum orçamento recebido</h4>
                    <p>Quando clientes solicitarem seus serviços, os orçamentos aparecerão aqui.</p>
                </div>
            `;
        }

        return `
            <div class="quotes-list">
                ${quotes.map(quote => `
                    <div class="quote-card ${quote.status}">
                        <div class="quote-header">
                            <div class="client-info">
                                <h4>${quote.clientName}</h4>
                                <span class="service-type">${quote.service}</span>
                            </div>
                            <div class="quote-status">
                                <span class="status-badge ${quote.status}">
                                    ${quote.status === 'pending' ? 'Pendente' : 'Respondido'}
                                </span>
                            </div>
                        </div>
                        <div class="quote-details">
                            <p><strong>Descrição:</strong> ${quote.description}</p>
                            <p><strong>Localização:</strong> ${quote.location}</p>
                            <p><strong>Orçamento:</strong> ${quote.budget}</p>
                            <p><strong>Data:</strong> ${new Date(quote.date).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div class="quote-actions">
                            ${quote.status === 'pending' ? `
                                <button class="btn btn-primary" onclick="window.app.sendProposal(${quote.id})">
                                    Enviar Proposta
                                </button>
                                <button class="btn btn-outline" onclick="window.app.declineQuote(${quote.id})">
                                    Recusar
                                </button>
                            ` : `
                                <button class="btn btn-success" disabled>
                                    Proposta Enviada
                                </button>
                            `}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    createSentProposalsContent() {
        const proposals = this.providerData.sentProposals;
        if (proposals.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-icon">📤</div>
                    <h4>Nenhuma proposta enviada</h4>
                    <p>Suas propostas enviadas aparecerão aqui.</p>
                </div>
            `;
        }

        return `
            <div class="proposals-list">
                ${proposals.map(proposal => `
                    <div class="proposal-card ${proposal.status}">
                        <div class="proposal-header">
                            <div class="client-info">
                                <h4>${proposal.clientName}</h4>
                                <span class="service-type">${proposal.service}</span>
                            </div>
                            <div class="proposal-status">
                                <span class="status-badge ${proposal.status}">
                                    ${proposal.status === 'waiting' ? 'Aguardando' : 'Respondido'}
                                </span>
                            </div>
                        </div>
                        <div class="proposal-details">
                            <p><strong>Proposta:</strong> ${proposal.proposal}</p>
                            <p><strong>Data:</strong> ${new Date(proposal.date).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div class="proposal-actions">
                            <button class="btn btn-outline" onclick="window.app.editProposal(${proposal.id})">
                                Editar
                            </button>
                            <button class="btn btn-danger" onclick="window.app.cancelProposal(${proposal.id})">
                                Cancelar
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    createApprovedQuotesContent() {
        const quotes = this.providerData.approvedQuotes;
        if (quotes.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-icon">✅</div>
                    <h4>Nenhum orçamento aprovado</h4>
                    <p>Orçamentos aprovados pelos clientes aparecerão aqui.</p>
                </div>
            `;
        }

        return `
            <div class="approved-quotes-list">
                ${quotes.map(quote => `
                    <div class="approved-quote-card">
                        <div class="quote-header">
                            <div class="client-info">
                                <h4>${quote.clientName}</h4>
                                <span class="service-type">${quote.service}</span>
                            </div>
                            <div class="quote-amount">
                                <span class="amount">${quote.amount}</span>
                            </div>
                        </div>
                        <div class="quote-details">
                            <p><strong>Data de Aprovação:</strong> ${new Date(quote.date).toLocaleDateString('pt-BR')}</p>
                            <p><strong>Status:</strong> <span class="status-badge approved">Aprovado</span></p>
                        </div>
                        <div class="quote-actions">
                            <button class="btn btn-primary" onclick="window.app.startService(${quote.id})">
                                Iniciar Serviço
                            </button>
                            <button class="btn btn-outline" onclick="window.app.contactClient(${quote.id})">
                                Contatar Cliente
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    createActiveServicesContent() {
        const services = this.providerData.activeServices;
        if (services.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-icon">▶️</div>
                    <h4>Nenhum serviço ativo</h4>
                    <p>Serviços em andamento aparecerão aqui.</p>
                </div>
            `;
        }

        return `
            <div class="active-services-list">
                ${services.map(service => `
                    <div class="active-service-card">
                        <div class="service-header">
                            <div class="client-info">
                                <h4>${service.clientName}</h4>
                                <span class="service-type">${service.service}</span>
                            </div>
                            <div class="service-status">
                                <span class="status-badge in_progress">Em Andamento</span>
                            </div>
                        </div>
                        <div class="service-details">
                            <p><strong>Descrição:</strong> ${service.description}</p>
                            <p><strong>Data de Início:</strong> ${new Date(service.startDate).toLocaleDateString('pt-BR')}</p>
                            <p><strong>Previsão de Conclusão:</strong> ${new Date(service.estimatedEnd).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div class="service-actions">
                            <button class="btn btn-success" onclick="window.app.completeService(${service.id})">
                                Finalizar Serviço
                            </button>
                            <button class="btn btn-primary" onclick="window.app.contactClient(${service.id})">
                                Contatar Cliente
                            </button>
                            <button class="btn btn-outline" onclick="window.app.updateProgress(${service.id})">
                                Atualizar Progresso
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    createServiceHistoryContent() {
        const history = this.providerData.serviceHistory;
        if (history.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-icon">📊</div>
                    <h4>Nenhum histórico de serviços</h4>
                    <p>Serviços concluídos aparecerão aqui.</p>
                </div>
            `;
        }

        return `
            <div class="service-history-list">
                ${history.map(service => `
                    <div class="history-service-card">
                        <div class="service-header">
                            <div class="client-info">
                                <h4>${service.clientName}</h4>
                                <span class="service-type">${service.service}</span>
                            </div>
                            <div class="service-rating">
                                <div class="rating-stars">
                                    ${'⭐'.repeat(service.rating)}${'☆'.repeat(5 - service.rating)}
                                </div>
                                <span class="rating-text">${service.rating}/5</span>
                            </div>
                        </div>
                        <div class="service-details">
                            <p><strong>Valor:</strong> ${service.amount}</p>
                            <p><strong>Data de Conclusão:</strong> ${new Date(service.date).toLocaleDateString('pt-BR')}</p>
                            <p><strong>Status:</strong> <span class="status-badge completed">Concluído</span></p>
                        </div>
                        <div class="service-actions">
                            <button class="btn btn-outline" onclick="window.app.viewServiceDetails(${service.id})">
                                Ver Detalhes
                            </button>
                            <button class="btn btn-primary" onclick="window.app.contactClient(${service.id})">
                                Contatar Cliente
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    createEarningsContent() {
        const earnings = this.providerData.earnings;
        const currentMonth = new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
        const lastMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

        return `
            <div class="earnings-dashboard">
                <!-- Summary Cards -->
                <div class="earnings-summary">
                    <div class="earnings-card current-month">
                        <div class="earnings-icon">💰</div>
                        <div class="earnings-info">
                            <h4>Este Mês</h4>
                            <p class="earnings-amount">R$ ${earnings.thisMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                            <span class="earnings-period">${currentMonth}</span>
                        </div>
                    </div>
                    
                    <div class="earnings-card last-month">
                        <div class="earnings-icon">📊</div>
                        <div class="earnings-info">
                            <h4>Mês Passado</h4>
                            <p class="earnings-amount">R$ ${earnings.lastMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                            <span class="earnings-period">${lastMonth}</span>
                        </div>
                    </div>
                    
                    <div class="earnings-card total">
                        <div class="earnings-icon">🏆</div>
                        <div class="earnings-info">
                            <h4>Total Geral</h4>
                            <p class="earnings-amount">R$ ${earnings.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                            <span class="earnings-period">Desde o início</span>
                        </div>
                    </div>
                    
                    <div class="earnings-card pending">
                        <div class="earnings-icon">⏳</div>
                        <div class="earnings-info">
                            <h4>Pendente</h4>
                            <p class="earnings-amount">R$ ${earnings.pending.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                            <span class="earnings-period">A receber</span>
                        </div>
                    </div>
                </div>

                <!-- Earnings Chart Placeholder -->
                <div class="earnings-chart">
                    <h4>📈 Evolução dos Ganhos (Últimos 6 meses)</h4>
                    <div class="chart-placeholder">
                        <div class="chart-bars">
                            <div class="chart-bar" style="height: 40%">
                                <span class="bar-label">Jul</span>
                                <span class="bar-value">R$ 1.2k</span>
                            </div>
                            <div class="chart-bar" style="height: 60%">
                                <span class="bar-label">Ago</span>
                                <span class="bar-value">R$ 1.8k</span>
                            </div>
                            <div class="chart-bar" style="height: 80%">
                                <span class="bar-label">Set</span>
                                <span class="bar-value">R$ 2.4k</span>
                            </div>
                            <div class="chart-bar" style="height: 70%">
                                <span class="bar-label">Out</span>
                                <span class="bar-value">R$ 2.1k</span>
                            </div>
                            <div class="chart-bar" style="height: 90%">
                                <span class="bar-label">Nov</span>
                                <span class="bar-value">R$ 2.7k</span>
                            </div>
                            <div class="chart-bar" style="height: 100%">
                                <span class="bar-label">Dez</span>
                                <span class="bar-value">R$ 3.0k</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Transactions -->
                <div class="recent-transactions">
                    <h4>💳 Transações Recentes</h4>
                    <div class="transactions-list">
                        <div class="transaction-item">
                            <div class="transaction-icon">✅</div>
                            <div class="transaction-details">
                                <p><strong>Carlos Lima</strong> - Eletricista</p>
                                <span class="transaction-date">12/01/2024</span>
                            </div>
                            <div class="transaction-amount positive">
                                +R$ 250,00
                            </div>
                        </div>
                        
                        <div class="transaction-item">
                            <div class="transaction-icon">⏳</div>
                            <div class="transaction-details">
                                <p><strong>Pedro Oliveira</strong> - Encanador</p>
                                <span class="transaction-date">Em andamento</span>
                            </div>
                            <div class="transaction-amount pending">
                                R$ 180,00
                            </div>
                        </div>
                        
                        <div class="transaction-item">
                            <div class="transaction-icon">✅</div>
                            <div class="transaction-details">
                                <p><strong>Lucia Ferreira</strong> - Eletricista</p>
                                <span class="transaction-date">10/01/2024</span>
                            </div>
                            <div class="transaction-amount positive">
                                +R$ 180,00
                            </div>
                        </div>
                        
                        <div class="transaction-item">
                            <div class="transaction-icon">✅</div>
                            <div class="transaction-details">
                                <p><strong>Roberto Alves</strong> - Encanador</p>
                                <span class="transaction-date">08/01/2024</span>
                            </div>
                            <div class="transaction-amount positive">
                                +R$ 320,00
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Payment Methods -->
                <div class="payment-methods">
                    <h4>💳 Métodos de Pagamento</h4>
                    <div class="methods-grid">
                        <div class="payment-method">
                            <div class="method-icon">🏦</div>
                            <div class="method-info">
                                <h5>Conta Bancária</h5>
                                <p>Banco do Brasil ****1234</p>
                                <span class="method-status active">Ativo</span>
                            </div>
                        </div>
                        
                        <div class="payment-method">
                            <div class="method-icon">💳</div>
                            <div class="method-info">
                                <h5>PIX</h5>
                                <p>CPF: ***.123.456-**</p>
                                <span class="method-status active">Ativo</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="earnings-actions">
                    <button class="btn btn-primary" onclick="window.app.requestPayment()">
                        💰 Solicitar Saque
                    </button>
                    <button class="btn btn-outline" onclick="window.app.viewDetailedReport()">
                        📊 Relatório Detalhado
                    </button>
                    <button class="btn btn-outline" onclick="window.app.managePaymentMethods()">
                        ⚙️ Gerenciar Pagamentos
                    </button>
                </div>
            </div>
        `;
    }

    createSpecialtiesContent() {
        const specialties = this.providerData.specialties;
        
        return `
            <div class="specialties-dashboard">
                <!-- Current Specialties -->
                <div class="current-specialties">
                    <div class="section-header">
                        <h4>🔧 Especialidades Ativas</h4>
                        <button class="btn btn-primary" onclick="window.app.addNewSpecialty()">
                            ➕ Adicionar Nova
                        </button>
                    </div>
                    
                    <div class="specialties-grid">
                        ${specialties.map(specialty => `
                            <div class="specialty-card ${specialty.status}">
                                <div class="specialty-header">
                                    <div class="specialty-icon">${specialty.icon}</div>
                                    <div class="specialty-status">
                                        <span class="status-badge ${specialty.status}">
                                            ${specialty.status === 'active' ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </div>
                                </div>
                                
                                <div class="specialty-info">
                                    <h5>${specialty.name}</h5>
                                    <p class="specialty-description">${specialty.description}</p>
                                    
                                    <div class="specialty-stats">
                                        <div class="stat-item">
                                            <span class="stat-icon">💰</span>
                                            <span class="stat-label">Preço Base:</span>
                                            <span class="stat-value">R$ ${specialty.basePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                        <div class="stat-item">
                                            <span class="stat-icon">⭐</span>
                                            <span class="stat-label">Avaliação:</span>
                                            <span class="stat-value">${specialty.rating}/5</span>
                                        </div>
                                        <div class="stat-item">
                                            <span class="stat-icon">📊</span>
                                            <span class="stat-label">Serviços:</span>
                                            <span class="stat-value">${specialty.completedJobs}</span>
                                        </div>
                                    </div>
                                    
                                    <div class="specialty-tags">
                                        ${specialty.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                                    </div>
                                </div>
                                
                                <div class="specialty-actions">
                                    <button class="btn btn-sm btn-outline" onclick="window.app.editSpecialty(${specialty.id})">
                                        ✏️ Editar
                                    </button>
                                    <button class="btn btn-sm ${specialty.status === 'active' ? 'btn-warning' : 'btn-success'}" 
                                            onclick="window.app.toggleSpecialty(${specialty.id})">
                                        ${specialty.status === 'active' ? '⏸️ Pausar' : '▶️ Ativar'}
                                    </button>
                                    <button class="btn btn-sm btn-danger" onclick="window.app.deleteSpecialty(${specialty.id})">
                                        🗑️ Remover
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Quick Stats -->
                <div class="specialties-stats">
                    <div class="stats-card">
                        <div class="stats-icon">🔧</div>
                        <div class="stats-info">
                            <h5>Total de Especialidades</h5>
                            <p class="stats-number">${specialties.length}</p>
                        </div>
                    </div>
                    
                    <div class="stats-card">
                        <div class="stats-icon">✅</div>
                        <div class="stats-info">
                            <h5>Especialidades Ativas</h5>
                            <p class="stats-number">${specialties.filter(s => s.status === 'active').length}</p>
                        </div>
                    </div>
                    
                    <div class="stats-card">
                        <div class="stats-icon">💰</div>
                        <div class="stats-info">
                            <h5>Faturamento Médio</h5>
                            <p class="stats-number">R$ ${Math.round(specialties.reduce((acc, s) => acc + s.basePrice, 0) / specialties.length).toLocaleString('pt-BR')}</p>
                        </div>
                    </div>
                    
                    <div class="stats-card">
                        <div class="stats-icon">⭐</div>
                        <div class="stats-info">
                            <h5>Avaliação Geral</h5>
                            <p class="stats-number">${(specialties.reduce((acc, s) => acc + s.rating, 0) / specialties.length).toFixed(1)}/5</p>
                        </div>
                    </div>
                </div>

                <!-- Service Categories -->
                <div class="service-categories">
                    <h4>📋 Categorias de Serviços Disponíveis</h4>
                    <div class="categories-grid">
                        <div class="category-item">
                            <div class="category-icon">🔧</div>
                            <h5>Encanador</h5>
                            <p>Reparos, instalações e manutenção hidráulica</p>
                            <button class="btn btn-sm btn-outline" onclick="window.app.addCategory('plumber')">
                                Adicionar
                            </button>
                        </div>
                        
                        <div class="category-item">
                            <div class="category-icon">⚡</div>
                            <h5>Eletricista</h5>
                            <p>Instalações elétricas e reparos</p>
                            <button class="btn btn-sm btn-outline" onclick="window.app.addCategory('electrician')">
                                Adicionar
                            </button>
                        </div>
                        
                        <div class="category-item">
                            <div class="category-icon">🧹</div>
                            <h5>Limpeza</h5>
                            <p>Limpeza residencial e comercial</p>
                            <button class="btn btn-sm btn-outline" onclick="window.app.addCategory('cleaning')">
                                Adicionar
                            </button>
                        </div>
                        
                        <div class="category-item">
                            <div class="category-icon">🎨</div>
                            <h5>Pintor</h5>
                            <p>Pintura interna e externa</p>
                            <button class="btn btn-sm btn-outline" onclick="window.app.addCategory('painter')">
                                Adicionar
                            </button>
                        </div>
                        
                        <div class="category-item">
                            <div class="category-icon">🔨</div>
                            <h5>Pedreiro</h5>
                            <p>Construção e reformas</p>
                            <button class="btn btn-sm btn-outline" onclick="window.app.addCategory('mason')">
                                Adicionar
                            </button>
                        </div>
                        
                        <div class="category-item">
                            <div class="category-icon">🌿</div>
                            <h5>Jardineiro</h5>
                            <p>Manutenção de jardins e paisagismo</p>
                            <button class="btn btn-sm btn-outline" onclick="window.app.addCategory('gardener')">
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="specialties-actions">
                    <button class="btn btn-primary" onclick="window.app.bulkEditSpecialties()">
                        📝 Edição em Massa
                    </button>
                    <button class="btn btn-outline" onclick="window.app.exportSpecialties()">
                        📤 Exportar Dados
                    </button>
                    <button class="btn btn-outline" onclick="window.app.viewPerformanceReport()">
                        📊 Relatório de Performance
                    </button>
                </div>
            </div>
        `;
    }

    navigateToSearch(serviceType = 'standard') {
        this.navigateToSection('search-section');
        
        // Update search title based on service type
        const searchTitle = document.getElementById('search-title');
        const searchList = document.getElementById('professionals-list');
        const resultsHeader = document.querySelector('.results-header');
        const serviceNames = {
            'emergency': 'Serviços 24Hrs - Emergências',
            'standard': 'Buscar Serviços',
            'enterprise': 'Grandes Serviços - Empresarial'
        };
        
        // Store the service type for context
        this.currentServiceType = serviceType;
        
        if (searchTitle) {
            searchTitle.textContent = serviceNames[serviceType] || 'Buscar Profissionais';
        }
        
        // Ocultar lista e cabeçalho inicialmente para página mais limpa
        if (searchList) searchList.classList.add('is-hidden');
        if (resultsHeader) resultsHeader.classList.add('is-hidden');
        
        // Não carrega profissionais automaticamente; só via filtro
        
        // Sponsored professionals removed to reduce visual clutter
        // this.renderSponsored();
    }

    // renderSponsored() removido

    openProviderProfile(professional) {
        const modal = document.getElementById('provider-profile-modal');
        const overlay = document.getElementById('modal-overlay');
        if (modal && overlay) {
            modal.style.display = 'block';
            overlay.style.display = 'block';
            modal.querySelector('#pp-avatar').textContent = professional.avatar;
            modal.querySelector('#pp-name').textContent = professional.name;
            modal.querySelector('#pp-specialty').textContent = professional.specialty;
            modal.querySelector('#pp-distance').textContent = `${professional.distanceKm || 0} km`;
            modal.querySelector('#pp-rating').textContent = `⭐ ${professional.rating}`;
            modal.querySelector('#pp-description').textContent = professional.description || `Profissional experiente em ${professional.specialty}`;
            const gal = modal.querySelector('#pp-gallery');
            gal.innerHTML = '';
            (professional.gallery || []).slice(0,5).forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = professional.name;
                gal.appendChild(img);
            });
            modal.querySelector('#pp-hire-btn').onclick = () => this.contactProfessional(professional.id, 'standard');
        }
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

    navigateToHome() {
        const currentUser = JSON.parse(localStorage.getItem('chamadoProUser') || 'null');
        
        if (currentUser) {
            // User is logged in, go to appropriate dashboard
            if (currentUser.type === 'client') {
                this.navigateToSection('client-dashboard');
            } else if (currentUser.type === 'provider') {
                this.navigateToSection('provider-dashboard');
            } else {
                // Fallback to landing page
                this.navigateToSection('landing-page');
            }
        } else {
            // User not logged in, go to landing page
            this.navigateToSection('landing-page');
        }
    }

    goBack() {
        // Check if we have a valid previous section in our app
        const currentUser = JSON.parse(localStorage.getItem('chamadoProUser') || 'null');
        
        console.log('goBack() called. Current section:', this.currentSection, 'User:', currentUser);
        
        // If we're in search-section, go back to appropriate dashboard or landing
        if (this.currentSection === 'search-section') {
            console.log('In search-section, navigating to appropriate home');
            if (currentUser) {
                if (currentUser.type === 'client') {
                    console.log('Navigating to client-dashboard');
                    this.navigateToSection('client-dashboard');
                } else if (currentUser.type === 'provider') {
                    console.log('Navigating to provider-dashboard');
                    this.navigateToSection('provider-dashboard');
                } else {
                    console.log('Navigating to landing-page (unknown user type)');
                    this.navigateToSection('landing-page');
                }
            } else {
                console.log('Navigating to landing-page (no user)');
                this.navigateToSection('landing-page');
            }
        } else {
            // For other sections, try browser history but with fallback
            console.log('Not in search-section, trying browser history');
            try {
                if (window.history.length > 1) {
                    console.log('Using browser history.back()');
                    window.history.back();
                } else {
                    console.log('No browser history, using navigateToHome()');
                    this.navigateToHome();
                }
            } catch (error) {
                console.log('history.back() failed, using navigateToHome():', error);
                // If history.back() fails, go to home
                this.navigateToHome();
            }
        }
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

        // Always show results, even without filters
        // If no search criteria, show all professionals

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

        // Sort by distance then rating desc (when available)
        filteredProfessionals = filteredProfessionals
            .slice()
            .sort((a,b) => (parseFloat(a.distanceKm || 0) - parseFloat(b.distanceKm || 0)) || (b.rating - a.rating));

        // Show all professionals if no specific filters
        if (filteredProfessionals.length === 0 && !serviceType && !priceType && !ratingMin) {
            filteredProfessionals = this.professionalsData.slice(0, 10); // Show first 10
        }

        // Update results count AFTER final list is defined
        this.updateResultsCount(filteredProfessionals.length);

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

    handlePhotoUpload(event, context = 'filters') {
        const files = event.target.files;
        const previewId = context === 'payment' ? 'payment-photo-preview' : 
                         context === 'visit' ? 'visit-photo-preview' : 
                         context === 'toolbar' ? 'st-photo-preview' : 'photo-preview';
        const counterId = context === 'payment' ? 'payment-photo-count' : 
                         context === 'visit' ? 'visit-photo-count' : null;
        const preview = document.getElementById(previewId);
        if (!preview) return;
        preview.innerHTML = '';
        
        // até 5 fotos
        Array.from(files).slice(0, 5).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.cursor = 'pointer';
                    img.draggable = true;
                    img.onclick = () => this.removePhoto(img);
                    // Drag reorder
                    img.addEventListener('dragstart', (ev) => {
                        ev.dataTransfer.setData('text/plain', Array.from(preview.children).indexOf(img));
                    });
                    preview.addEventListener('dragover', (ev) => ev.preventDefault());
                    preview.addEventListener('drop', (ev) => {
                        ev.preventDefault();
                        const from = parseInt(ev.dataTransfer.getData('text/plain'), 10);
                        const to = Array.from(preview.children).indexOf(ev.target.closest('img'));
                        if (from >= 0 && to >= 0 && from !== to) {
                            const node = preview.children[from];
                            if (to < from) preview.insertBefore(node, preview.children[to]);
                            else preview.insertBefore(node, preview.children[to].nextSibling);
                        }
                    });
                    preview.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        });

        if (counterId) {
            const counter = document.getElementById(counterId);
            if (counter) counter.textContent = Math.min(files.length, 5).toString();
        }
    }

    enableUploadDnd(areaId, inputId, context) {
        const area = document.getElementById(areaId);
        const input = document.getElementById(inputId);
        if (!area || !input) return;
        const prevent = (e) => { e.preventDefault(); e.stopPropagation(); };
        ['dragenter','dragover','dragleave','drop'].forEach(ev => area.addEventListener(ev, prevent));
        ['dragenter','dragover'].forEach(ev => area.addEventListener(ev, () => area.classList.add('dragover')));
        ['dragleave','drop'].forEach(ev => area.addEventListener(ev, () => area.classList.remove('dragover')));
        area.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            if (!dt || !dt.files) return;
            // cria um DataTransfer para setar no input
            const data = new DataTransfer();
            Array.from(dt.files).slice(0,5).forEach(f => data.items.add(f));
            input.files = data.files;
            this.handlePhotoUpload({ target: input }, context);
        });
    }

    resetPhotoArea(context) {
        const previewId = context === 'payment' ? 'payment-photo-preview' : 'visit-photo-preview';
        const inputId = context === 'payment' ? 'payment-photo-input' : 'visit-photo-input';
        const counterId = context === 'payment' ? 'payment-photo-count' : 'visit-photo-count';
        const preview = document.getElementById(previewId);
        const input = document.getElementById(inputId);
        const counter = document.getElementById(counterId);
        if (preview) preview.innerHTML = '';
        if (input) input.value = '';
        if (counter) counter.textContent = '0';
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
            // UX tip
            this.showToast('Dica: envie fotos do problema para agilizar o atendimento.', 'info');
            // Reset previews e habilita DnD para upload
            this.resetPhotoArea('payment');
            this.enableUploadDnd('payment-upload-area','payment-photo-input','payment');
            // Update payment modal content
            const paymentProviderName = document.getElementById('payment-provider-name');
            const paymentService = document.getElementById('payment-service');
            const paymentValue = document.getElementById('payment-value');
            const paymentType = document.getElementById('payment-type');
            
            if (paymentProviderName) paymentProviderName.textContent = professional.name;
            if (paymentService) paymentService.textContent = professional.specialty;
            if (paymentValue) paymentValue.textContent = budgetType === 'visit' ? 'R$ 15,00' : professional.price;
            if (paymentType) paymentType.textContent = budgetType === 'visit' ? 'Orçamento com Visita' : 'Orçamento Padrão';
            // Breakdown logic: visita = taxa fixa, padrão = mostra taxa 5%
            const breakdown = document.getElementById('payment-breakdown');
            if (budgetType === 'visit') {
                breakdown.style.display = 'none';
                const paymentNote = document.getElementById('payment-note');
                if (paymentNote) paymentNote.textContent = 'Pagamento apenas após a execução, combinado diretamente com o prestador.';
            } else {
                breakdown.style.display = 'block';
                // Attempt to parse price numbers
                const priceText = professional.price.replace(/[^0-9,]/g, '').replace(',', '.');
                const base = parseFloat(priceText) || 0;
                const fee = (base * 0.05); // oculto para o cliente no texto
                const total = base;
                const breakdownSubtotal = document.getElementById('breakdown-subtotal');
                const breakdownFee = document.getElementById('breakdown-fee');
                const breakdownTotal = document.getElementById('breakdown-total');
                const paymentNote = document.getElementById('payment-note');
                
                if (breakdownSubtotal) breakdownSubtotal.textContent = `R$ ${base.toFixed(2).replace('.', ',')}`;
                if (breakdownFee) breakdownFee.textContent = `R$ ${fee.toFixed(2).replace('.', ',')}`;
                if (breakdownTotal) breakdownTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
                if (paymentNote) paymentNote.textContent = 'Pagamento protegido (escrow)';
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
            // Only hide overlay if no other modals are visible
            const visibleModals = document.querySelectorAll('.modal[style*="block"]');
            if (visibleModals.length === 0) {
            document.getElementById('modal-overlay').style.display = 'none';
            }
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
        
        const summaryName = document.getElementById('summary-name');
        const summaryEmail = document.getElementById('summary-email');
        const summaryPhone = document.getElementById('summary-phone');
        
        if (summaryName) summaryName.textContent = formData.name || '';
        if (summaryEmail) summaryEmail.textContent = formData.email || '';
        if (summaryPhone) summaryPhone.textContent = formData.phone || '';
        
        // Get selected payment methods (client)
        const selectedPayments = Array.from(document.querySelectorAll('input[name="payment-methods"]:checked'))
            .map(input => ({
                pix: 'PIX',
                credit: 'Cartão de Crédito',
                debit: 'Cartão de Débito',
                wallet: 'Carteira ChamadoPro'
            }[input.value]));
        const summaryPayments = document.getElementById('summary-payments');
        if (summaryPayments) summaryPayments.textContent = selectedPayments.join(', ') || '—';

        // Provider specialties and receiving summary
        const isProvider = this.registerType === 'provider';
        const specRow = document.getElementById('summary-specialties-row');
        const recvRow = document.getElementById('summary-receiving-row');
        if (specRow) specRow.style.display = isProvider ? 'flex' : 'none';
        if (recvRow) recvRow.style.display = isProvider ? 'flex' : 'none';
        if (isProvider) {
            const specialties = Array.from(document.querySelectorAll('input[name="specialties"]:checked'))
                .map(i => i.parentElement.textContent.trim());
            const summarySpecialties = document.getElementById('summary-specialties');
            if (summarySpecialties) summarySpecialties.textContent = specialties.join(', ') || '—';
            
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
            const summaryReceiving = document.getElementById('summary-receiving');
            if (summaryReceiving) summaryReceiving.textContent = `Tipos: ${priceTypesText} | PIX: ${pixKey} ${bank && acc ? `| ${bank} ${acc}` : ''}`.trim();
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
        const paymentTypeEl = document.getElementById('payment-type');
        const paymentType = paymentTypeEl ? paymentTypeEl.textContent : '';
        
        // Simulate payment processing
        this.showToast('Processando pagamento...', 'info');
        
        setTimeout(() => {
            this.closeAllModals();
            this.showToast('Pagamento realizado com sucesso!', 'success');
            
            // Persist minimal request with photos (quando houver)
            try {
                const images = Array.from(document.querySelectorAll('#payment-photo-preview img')).map(img => img.src);
                const notes = document.getElementById('payment-notes')?.value || '';
                if (images.length > 0) {
                    const existing = JSON.parse(localStorage.getItem('chamadoProRequests') || '[]');
                    existing.push({
                        createdAt: new Date().toISOString(),
                        type: paymentType,
                        photos: images,
                        notes,
                    });
                    localStorage.setItem('chamadoProRequests', JSON.stringify(existing));
                }
            } catch(_) {}

            // Navigate to appropriate dashboard
            if (this.currentUser) {
                this.showUserDashboard();
                this.updateRequestsCounter();
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

    initTouchEvents() {
        // Prevent zoom on double tap for buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                btn.click();
            });
        });
        
        // Swipe to close modals
        document.querySelectorAll('.modal').forEach(modal => {
            let startY = 0;
            modal.addEventListener('touchstart', (e) => {
                startY = e.touches[0].clientY;
            });
            
            modal.addEventListener('touchmove', (e) => {
                const currentY = e.touches[0].clientY;
                const diffY = startY - currentY;
                
                // Swipe down to close modal
                if (diffY > 100) {
                    this.closeModal();
                }
            });
        });
        
        // Touch feedback for cards
        document.querySelectorAll('.service-card, .summary-card, .marketing-card').forEach(card => {
            card.addEventListener('touchstart', () => {
                card.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', () => {
                card.style.transform = '';
            });
        });
    }

    toggleMobileMenu() {
        const drawer = document.getElementById('mobile-drawer');
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

    toggleFilters() {
        const filtersPanel = document.getElementById('filters-panel');
        if (filtersPanel) {
            const isVisible = filtersPanel.style.display !== 'none';
            filtersPanel.style.display = isVisible ? 'none' : 'block';
        }
    }

    updateResultsCount(count) {
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) {
            resultsCount.textContent = `${count} profissionais encontrados`;
        }
    }

    searchProfessionals() {
        // Get service type from toolbar select
        const serviceTypeSelect = document.getElementById('service-type-toolbar');
        const serviceType = serviceTypeSelect ? serviceTypeSelect.value : '';
        
        const location = document.getElementById('location')?.value || '';
        const budgetType = document.querySelector('input[name="budget-type"]:checked')?.value || 'standard';
        const priceType = document.getElementById('price-type')?.value || '';
        const ratingMin = parseFloat(document.getElementById('rating-min')?.value || '0');
        const availability = document.getElementById('availability')?.value || 'any';
        
        if (!serviceType) {
            this.showToast('Selecione o tipo de serviço!', 'error');
            return;
        }
        
        // Filter professionals based on search criteria
        this.loadProfessionals(serviceType, priceType, ratingMin, availability);
        this.showToast('Buscando profissionais...', 'info');

        // Mostrar resultados após aplicar filtro
        const list = document.getElementById('professionals-list');
        const resultsHeader = document.querySelector('.results-header');
        if (list) list.classList.remove('is-hidden');
        if (resultsHeader) resultsHeader.classList.remove('is-hidden');
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
        const modal = document.getElementById('requests-modal');
        const overlay = document.getElementById('modal-overlay');
        const list = document.getElementById('requests-list');
        if (!modal || !overlay || !list) return;
        const items = JSON.parse(localStorage.getItem('chamadoProRequests') || '[]').reverse();
        list.innerHTML = '';
        if (items.length === 0) {
            const empty = document.createElement('div');
            empty.textContent = 'Nenhuma solicitação encontrada.';
            list.appendChild(empty);
        } else {
            items.forEach((req, idx) => {
                const card = document.createElement('div');
                card.className = 'request-card';
                const when = new Date(req.createdAt).toLocaleString();
                card.innerHTML = `
                    <div><strong>${req.type || 'Solicitação'}</strong></div>
                    <small>${when}</small>
                    ${req.notes ? `<div style="margin-top:.25rem; color:#495057; font-size:.9rem;">${req.notes}</div>` : ''}
                    <div class="request-thumb">${(req.photos||[]).slice(0,5).map(src => `<img src="${src}"/>`).join('')}</div>
                    <div style="margin-top:.5rem; display:flex; gap:.5rem;">
                        <button class="btn btn-outline btn-sm" data-action="delete" data-index="${idx}">Excluir</button>
                    </div>
                `;
                list.appendChild(card);
            });
            list.querySelectorAll('button[data-action="delete"]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const i = parseInt(btn.getAttribute('data-index'), 10);
                    const arr = JSON.parse(localStorage.getItem('chamadoProRequests') || '[]');
                    arr.splice(i,1);
                    localStorage.setItem('chamadoProRequests', JSON.stringify(arr));
                    this.showUserRequests();
                    this.updateRequestsCounter();
                });
            });
        }
        overlay.style.display = 'block';
        modal.style.display = 'block';
    }

    showApprovedQuotes() {
        this.closeProviderSidebar();
        this.showProviderModal('Orçamentos Aprovados', this.createApprovedQuotesContent());
    }

    showScheduledVisits() {
        this.showToast('Funcionalidade em desenvolvimento: Visitas Marcadas', 'info');
    }

    showServiceHistory() {
        this.closeProviderSidebar();
        this.showProviderModal('Histórico de Serviços', this.createServiceHistoryContent());
    }

    showActiveServices() {
        this.closeProviderSidebar();
        this.showProviderModal('Serviços Ativos', this.createActiveServicesContent());
    }

    showReceivedQuotes() {
        this.closeProviderSidebar();
        this.showProviderModal('Orçamentos Recebidos', this.createReceivedQuotesContent());
    }

    showSentProposals() {
        this.closeProviderSidebar();
        this.showProviderModal('Propostas Enviadas', this.createSentProposalsContent());
    }

    showRejectedQuotes() {
        this.showToast('Funcionalidade em desenvolvimento: Orçamentos Recusados', 'info');
    }

    showEarnings() {
        this.closeProviderSidebar();
        this.showProviderModal('Ganhos Financeiros', this.createEarningsContent());
    }

    showSpecialties() {
        this.closeProviderSidebar();
        this.showProviderModal('Minhas Especialidades', this.createSpecialtiesContent());
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

// Add new functions to the app
ChamadoProApp.prototype.selectBudgetType = function(type) {
    // Remove active class from all budget buttons
    document.querySelectorAll('.budget-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to selected button
    const selectedBtn = document.getElementById(`btn-budget-${type}`);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }
    
    // Store selected budget type
    this.selectedBudgetType = type;
    
    // Update checkbox visibility and behavior
    this.updateSendToAllOption(type);
};

ChamadoProApp.prototype.updateSendToAllOption = function(budgetType) {
    const checkbox = document.getElementById('send-all-toggle');
    const checkboxLabel = checkbox?.parentElement;
    
    if (!checkbox || !checkboxLabel) return;
    
    if (budgetType === 'visit') {
        // For visit budget, disable "send to all" option
        checkbox.disabled = true;
        checkbox.checked = false;
        checkboxLabel.style.opacity = '0.6';
        checkboxLabel.style.cursor = 'not-allowed';
        
        // Update hint text
        const hint = checkboxLabel.querySelector('.checkbox-hint');
        if (hint) {
            hint.textContent = 'Para orçamento com visita, selecione prestadores específicos';
        }
    } else {
        // For standard budget, enable "send to all" option
        checkbox.disabled = false;
        checkboxLabel.style.opacity = '1';
        checkboxLabel.style.cursor = 'pointer';
        
        // Update hint text
        const hint = checkboxLabel.querySelector('.checkbox-hint');
        if (hint) {
            hint.textContent = 'Receba mais propostas comparando preços';
        }
    }
};

ChamadoProApp.prototype.submitRequest = function() {
    // Check if user is logged in
    const userData = JSON.parse(localStorage.getItem('chamadoProUser') || 'null');
    if (!userData) {
        // User not logged in - show login/register modal
        this.showToast('Você precisa estar logado para solicitar serviços', 'info');
        this.showInitialRegisterModal();
        return;
    }
    
    // Check if user has complete profile (address and payment)
    if (!userData.address || !userData.paymentMethods || userData.paymentMethods.length === 0) {
        // User logged in but needs to complete profile
        this.showServiceRegistrationModal(userData);
        return;
    }
    
    // Get form data
    const serviceType = document.getElementById('service-type-toolbar').value;
    const location = document.getElementById('location-input').value;
    const description = document.getElementById('st-desc').value;
    const sendToAll = document.getElementById('send-all-toggle').checked;
    
    // Validate required fields
    if (!serviceType) {
        this.showToast('Por favor, selecione o tipo de serviço', 'error');
        return;
    }
    
    if (!location) {
        this.showToast('Por favor, informe sua localização', 'error');
        return;
    }
    
    if (!description.trim()) {
        this.showToast('Por favor, descreva o que precisa', 'error');
        return;
    }
    
    // Get photos
    const photoInput = document.getElementById('st-photo-input');
    const photos = [];
    if (photoInput.files.length > 0) {
        Array.from(photoInput.files).forEach(file => {
            if (file.type.startsWith('image/')) {
                photos.push(file.name);
            }
        });
    }
    
    // Create request object
    const request = {
        id: Date.now(),
        serviceType,
        location,
        description,
        photos,
        budgetType: this.selectedBudgetType || 'standard',
        sendToAll,
        status: 'pending',
        createdAt: new Date().toISOString(),
        recipients: sendToAll ? 'all_providers' : 'selected_providers'
    };
    
    // Save to localStorage
    const requests = JSON.parse(localStorage.getItem('chamadoProRequests') || '[]');
    requests.push(request);
    localStorage.setItem('chamadoProRequests', JSON.stringify(requests));
    
    // Show success message with details
    const message = sendToAll 
        ? 'Solicitação enviada para todos os prestadores disponíveis!' 
        : 'Solicitação enviada com sucesso!';
    this.showToast(message, 'success');
    
    // If sending to all, show additional info
    if (sendToAll) {
        setTimeout(() => {
            this.showToast('Você receberá propostas dos prestadores interessados', 'info');
        }, 2000);
    }
    
    // Reset form
    this.resetRequestForm();
    
    // Navigate to dashboard to see the request
    this.navigateToSection('dashboard-section');
};

ChamadoProApp.prototype.resetRequestForm = function() {
    document.getElementById('service-type-toolbar').value = '';
    document.getElementById('location-input').value = '';
    document.getElementById('st-desc').value = '';
    document.getElementById('send-all-toggle').checked = false;
    
    // Reset photo upload
    const photoInput = document.getElementById('st-photo-input');
    photoInput.value = '';
    const preview = document.getElementById('st-photo-preview');
    if (preview) preview.innerHTML = '';
    
    // Reset budget type selection
    this.selectBudgetType('standard');
};

ChamadoProApp.prototype.clearFilters = function() {
    // Reset the request form
    this.resetRequestForm();
    
    // Hide results
    const searchList = document.getElementById('professionals-list');
    const resultsHeader = document.querySelector('.results-header');
    if (searchList) searchList.classList.add('is-hidden');
    if (resultsHeader) resultsHeader.classList.add('is-hidden');
    
    // Show toast
    this.showToast('Filtros limpos com sucesso!', 'success');
};

ChamadoProApp.prototype.newFilter = function() {
    // Reset the request form
    this.resetRequestForm();
    
    // Hide results
    const searchList = document.getElementById('professionals-list');
    const resultsHeader = document.querySelector('.results-header');
    if (searchList) searchList.classList.add('is-hidden');
    if (resultsHeader) resultsHeader.classList.add('is-hidden');
    
    // Scroll to top of form
    const form = document.querySelector('.quick-request-form');
    if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Show toast
    this.showToast('Novo filtro iniciado! Preencha os dados abaixo', 'info');
    
    // Focus on first field
    setTimeout(() => {
        const serviceSelect = document.getElementById('service-type-toolbar');
        if (serviceSelect) serviceSelect.focus();
    }, 500);
};

// Initial Registration Modal Functions
ChamadoProApp.prototype.showInitialRegisterModal = function(type = null) {
    const modal = document.getElementById('initial-register-modal');
    const overlay = document.getElementById('modal-overlay');
    if (modal && overlay) {
        modal.style.display = 'block';
        overlay.style.display = 'block';
        
        if (type) {
            // User already selected type, go directly to form
            this.selectInitialRegisterType(type);
            // Hide the type selector and show back button
            document.querySelector('.register-type-selector').style.display = 'none';
            document.getElementById('modal-nav').style.display = 'block';
        } else {
            // Show type selector (for general access)
            document.querySelector('.register-type-selector').style.display = 'grid';
            document.getElementById('initial-register-form').style.display = 'none';
            document.getElementById('modal-nav').style.display = 'none';
            document.querySelectorAll('.register-type-btn').forEach(btn => btn.classList.remove('active'));
        }
    }
};

ChamadoProApp.prototype.selectInitialRegisterType = function(type) {
    // Remove active class from all buttons
    document.querySelectorAll('.register-type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to selected button
    const selectedBtn = document.getElementById(`initial-register-${type}`);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }
    
    // Show form
    const form = document.getElementById('initial-register-form');
    if (form) {
        form.style.display = 'block';
    }
    
    // Store selected type
    this.initialRegisterType = type;
    
    // Update modal title based on type
    const modalTitle = document.querySelector('#initial-register-modal .modal-header h3');
    if (modalTitle) {
        modalTitle.textContent = `Cadastrar ${type === 'client' ? 'Cliente' : 'Prestador'}`;
    }
};

ChamadoProApp.prototype.processInitialRegistration = function(formData) {
    // Create user object with basic data
    const userData = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: this.initialRegisterType,
        isComplete: false, // Profile not complete yet
        createdAt: new Date().toISOString()
    };
    
    // Save user data
    localStorage.setItem('chamadoProUser', JSON.stringify(userData));
    
    // Close modal
    this.closeModal(document.getElementById('initial-register-modal'));
    
    // Show success message
    this.showToast('Conta criada com sucesso!', 'success');
    
    // Update UI
    this.updateUserInterface();
    
    // If user was trying to request a service, continue with that flow
    if (this.pendingServiceRequest) {
        this.showServiceRegistrationModal(userData);
    }
};

ChamadoProApp.prototype.showServiceRegistrationModal = function(userData) {
    // Show modal to complete profile with address and payment
    this.showToast('Complete seus dados para solicitar o serviço', 'info');
    
    // For now, we'll use the existing register modal but with different content
    // In a real implementation, you'd create a specific modal for this
    this.showRegisterModal('client');
    
    // Pre-fill with existing user data
    const nameField = document.getElementById('register-name');
    const emailField = document.getElementById('register-email');
    const phoneField = document.getElementById('register-phone');
    
    if (nameField) nameField.value = userData.name || '';
    if (emailField) emailField.value = userData.email || '';
    if (phoneField) phoneField.value = userData.phone || '';
};

ChamadoProApp.prototype.handleInitialRegistration = function() {
    // Get form data
    const formData = {
        name: document.getElementById('initial-register-name').value,
        email: document.getElementById('initial-register-email').value,
        phone: document.getElementById('initial-register-phone').value,
        password: document.getElementById('initial-register-password').value
    };
    
    // Validate form
    if (!formData.name.trim()) {
        this.showToast('Por favor, informe seu nome', 'error');
        return;
    }
    
    if (!formData.email.trim()) {
        this.showToast('Por favor, informe seu email', 'error');
        return;
    }
    
    if (!formData.phone.trim()) {
        this.showToast('Por favor, informe seu telefone', 'error');
        return;
    }
    
    if (!formData.password.trim()) {
        this.showToast('Por favor, crie uma senha', 'error');
        return;
    }
    
    // Process registration
    this.processInitialRegistration(formData);
};

// Social Login Functions (Mock implementations)
function loginWithGoogle() {
    window.app.showToast('Login com Google - Funcionalidade em desenvolvimento', 'info');
}

function loginWithFacebook() {
    window.app.showToast('Login com Facebook - Funcionalidade em desenvolvimento', 'info');
}

function loginWithInstagram() {
    window.app.showToast('Login com Instagram - Funcionalidade em desenvolvimento', 'info');
}

function selectInitialRegisterType(type) {
    if (window.app) {
        window.app.selectInitialRegisterType(type);
    }
}

function goBackToTypeSelection() {
    if (window.app) {
        // Show type selector
        document.querySelector('.register-type-selector').style.display = 'grid';
        // Hide form and back button
        document.getElementById('initial-register-form').style.display = 'none';
        document.getElementById('modal-nav').style.display = 'none';
        // Reset active buttons
        document.querySelectorAll('.register-type-btn').forEach(btn => btn.classList.remove('active'));
        // Reset modal title
        const modalTitle = document.querySelector('#initial-register-modal .modal-header h3');
        if (modalTitle) {
            modalTitle.textContent = 'Cadastrar no ChamadoPro';
        }
    }
}

// Provider Dashboard Functions
function showReceivedQuotes() {
    window.app.showReceivedQuotes();
}

function showSentProposals() {
    window.app.showSentProposals();
}

function showApprovedQuotes() {
    window.app.showApprovedQuotes();
}

function showActiveServices() {
    window.app.showActiveServices();
}

function showServiceHistory() {
    window.app.showServiceHistory();
}

function showMySpecialties() {
    window.app.showSpecialties();
}

function showEarnings() {
    window.app.showEarnings();
}

function showWorkCalendar() {
    window.app.showToast('Calendário de Trabalho - Funcionalidade em desenvolvimento', 'info');
    window.app.closeProviderSidebar();
}

function showAvailability() {
    window.app.showToast('Configurar Disponibilidade - Funcionalidade em desenvolvimento', 'info');
    window.app.closeProviderSidebar();
}

// Provider Sidebar Functions
ChamadoProApp.prototype.toggleProviderSidebar = function() {
    const sidebar = document.querySelector('#provider-dashboard .sidebar-menu');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (sidebar && overlay) {
        if (sidebar.classList.contains('show')) {
            this.closeProviderSidebar();
        } else {
            this.openProviderSidebar();
        }
    }
};

ChamadoProApp.prototype.openProviderSidebar = function() {
    const sidebar = document.querySelector('#provider-dashboard .sidebar-menu');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.add('show');
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
};

ChamadoProApp.prototype.closeProviderSidebar = function() {
    const sidebar = document.querySelector('#provider-dashboard .sidebar-menu');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }
};

// Client Sidebar Functions
ChamadoProApp.prototype.toggleClientSidebar = function() {
    const sidebar = document.querySelector('#client-dashboard .sidebar-menu');
    const overlay = document.getElementById('client-sidebar-overlay');
    
    if (sidebar && overlay) {
        if (sidebar.classList.contains('show')) {
            this.closeClientSidebar();
        } else {
            this.openClientSidebar();
        }
    }
};

ChamadoProApp.prototype.openClientSidebar = function() {
    const sidebar = document.querySelector('#client-dashboard .sidebar-menu');
    const overlay = document.getElementById('client-sidebar-overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.add('show');
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
};

ChamadoProApp.prototype.closeClientSidebar = function() {
    const sidebar = document.querySelector('#client-dashboard .sidebar-menu');
    const overlay = document.getElementById('client-sidebar-overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }
};

// Marketing Functions
function showPartners() {
    window.app.showToast('Parceiros Comerciais - Funcionalidade em desenvolvimento', 'info');
    window.app.closeClientSidebar();
}

function showRewards() {
    window.app.showToast('Programa Rewards - Funcionalidade em desenvolvimento', 'info');
    window.app.closeClientSidebar();
}

function showDiscounts() {
    window.app.showToast('Descontos Exclusivos - Funcionalidade em desenvolvimento', 'info');
    window.app.closeClientSidebar();
}

function showConstructionPartners() {
    window.app.showToast('Construtoras Parceiras - Funcionalidade em desenvolvimento', 'info');
}

function showCommercialPartners() {
    window.app.showToast('Lojas Comerciais - Funcionalidade em desenvolvimento', 'info');
}

function showInsurancePartners() {
    window.app.showToast('Seguros Parceiros - Funcionalidade em desenvolvimento', 'info');
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
