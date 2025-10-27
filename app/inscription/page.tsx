// import React, { useState } from 'react';
// import { User, Mail, Lock, CheckCircle, ArrowRight, ArrowLeft, Briefcase, DollarSign, Smartphone, AlertTriangle } from 'lucide-react';

// // Composant pour l'affichage des messages (simule une alerte sans utiliser alert())
// const MessageBox = ({ message, type = 'info' }) => {
//     let colorClass, Icon;
//     switch (type) {
//         case 'success':
//             colorClass = 'bg-green-600 border-green-700';
//             Icon = CheckCircle;
//             break;
//         case 'error':
//             colorClass = 'bg-red-600 border-red-700';
//             Icon = AlertTriangle;
//             break;
//         default:
//             colorClass = 'bg-indigo-600 border-indigo-700';
//             Icon = AlertTriangle;
//     }

//     if (!message) return null;

//     return (
//         <div className={`p-3 rounded-lg flex items-center mb-4 ${colorClass} text-white transition-opacity duration-300`}>
//             <Icon className="w-5 h-5 mr-3" />
//             <p className="text-sm font-medium">{message}</p>
//         </div>
//     );
// };

// // Composant de Champ de Formulaire stylisé
// const InputField = ({ label, id, icon: Icon, ...props }) => (
//     <div className="mb-5">
//         <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
//         <div className="relative">
//             <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
//             <input
//                 id={id}
//                 {...props}
//                 className="w-full pl-11 pr-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-inner placeholder-gray-400"
//                 required
//             />
//         </div>
//     </div>
// );

// // --- ÉTAPE 1: Informations du Compte ---
// const Step1 = ({ formData, handleChange, nextStep, errors }) => (
//     <div className="space-y-4">
//         <InputField 
//             label="Nom Complet"
//             id="fullName"
//             type="text"
//             icon={User}
//             placeholder="Ex: Jean Dupont"
//             value={formData.fullName}
//             onChange={handleChange('fullName')}
//         />
//         {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
        
//         <InputField 
//             label="Adresse Email Professionnelle"
//             id="email"
//             type="email"
//             icon={Mail}
//             placeholder="nom.prenom@entreprise.com"
//             value={formData.email}
//             onChange={handleChange('email')}
//         />
//         {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}

//         <InputField 
//             label="Mot de Passe"
//             id="password"
//             type="password"
//             icon={Lock}
//             placeholder="Minimum 8 caractères"
//             value={formData.password}
//             onChange={handleChange('password')}
//         />
//         {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
        
//         <button 
//             onClick={nextStep}
//             className="w-full mt-6 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
//         >
//             Suivant : Profil Financier <ArrowRight className="w-4 h-4 ml-2" />
//         </button>
//     </div>
// );

// // --- ÉTAPE 2: Profil Financier et Conformité ---
// const Step2 = ({ formData, handleChange, prevStep, handleSubmit, errors }) => (
//     <div className="space-y-4">
//         <InputField 
//             label="Numéro de Téléphone"
//             id="phone"
//             type="tel"
//             icon={Smartphone}
//             placeholder="+33 6 12 34 56 78"
//             value={formData.phone}
//             onChange={handleChange('phone')}
//         />
//         {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}

//         <div className="mb-5">
//             <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2">Expérience de Trading</label>
//             <div className="relative">
//                 <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
//                 <select
//                     id="experience"
//                     value={formData.experience}
//                     onChange={handleChange('experience')}
//                     className="w-full pl-11 pr-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-inner appearance-none cursor-pointer"
//                     required
//                 >
//                     <option value="" disabled className="text-gray-400">Sélectionner votre niveau</option>
//                     <option value="beginner">Débutant (Moins d'1 an)</option>
//                     <option value="intermediate">Intermédiaire (1-3 ans)</option>
//                     <option value="advanced">Avancé (3-5 ans)</option>
//                     <option value="professional">Professionnel (5 ans et +)</option>
//                 </select>
//             </div>
//             {errors.experience && <p className="text-red-400 text-xs mt-1">{errors.experience}</p>}
//         </div>

//         <div className="mb-5">
//             <label htmlFor="investments" className="block text-sm font-medium text-gray-300 mb-2">Montant d'Investissement Prévu (Annuel)</label>
//             <div className="relative">
//                 <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
//                 <select
//                     id="investments"
//                     value={formData.investments}
//                     onChange={handleChange('investments')}
//                     className="w-full pl-11 pr-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-inner appearance-none cursor-pointer"
//                     required
//                 >
//                     <option value="" disabled className="text-gray-400">Sélectionner un montant</option>
//                     <option value="5k">Moins de 5 000 €</option>
//                     <option value="25k">5 000 € - 25 000 €</option>
//                     <option value="100k">25 000 € - 100 000 €</option>
//                     <option value="500k">100 000 € et plus</option>
//                 </select>
//             </div>
//             {errors.investments && <p className="text-red-400 text-xs mt-1">{errors.investments}</p>}
//         </div>

//         <div className="flex justify-between mt-6">
//             <button 
//                 onClick={prevStep}
//                 className="flex items-center bg-gray-600 hover:bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50"
//             >
//                 <ArrowLeft className="w-4 h-4 mr-2" /> Retour
//             </button>
//             <button 
//                 onClick={handleSubmit}
//                 className="flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
//             >
//                 Finaliser l'Inscription <CheckCircle className="w-4 h-4 ml-2" />
//             </button>
//         </div>
//     </div>
// );


// const Inscription = () => {
//     const [step, setStep] = useState(1);
//     const [formData, setFormData] = useState({
//         fullName: '',
//         email: '',
//         password: '',
//         phone: '',
//         experience: '',
//         investments: ''
//     });
//     const [errors, setErrors] = useState({});
//     const [submissionMessage, setSubmissionMessage] = useState(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // Fonction de validation (simple)
//     const validate = (currentStep) => {
//         let newErrors = {};
//         let isValid = true;

//         if (currentStep === 1) {
//             if (!formData.fullName) { newErrors.fullName = "Le nom complet est requis."; isValid = false; }
//             if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) { newErrors.email = "L'adresse email est invalide."; isValid = false; }
//             if (formData.password.length < 8) { newErrors.password = "Le mot de passe doit contenir au moins 8 caractères."; isValid = false; }
//         } else if (currentStep === 2) {
//             if (!formData.phone) { newErrors.phone = "Le numéro de téléphone est requis."; isValid = false; }
//             if (!formData.experience) { newErrors.experience = "Veuillez sélectionner votre expérience."; isValid = false; }
//             if (!formData.investments) { newErrors.investments = "Veuillez sélectionner un montant d'investissement."; isValid = false; }
//         }

//         setErrors(newErrors);
//         return isValid;
//     };

//     const handleChange = input => e => {
//         setFormData({ ...formData, [input]: e.target.value });
//         // Efface l'erreur dès que l'utilisateur commence à taper
//         if (errors[input]) {
//             setErrors(prev => ({ ...prev, [input]: null }));
//         }
//     };

//     const nextStep = () => {
//         if (validate(1)) {
//             setStep(2);
//             setSubmissionMessage(null);
//         }
//     };

//     const prevStep = () => {
//         setStep(1);
//         setSubmissionMessage(null);
//     };

//     const handleSubmit = () => {
//         if (validate(2)) {
//             setIsSubmitting(true);
//             setSubmissionMessage(null);
            
//             // Simuler un appel API pour l'inscription
//             setTimeout(() => {
//                 setIsSubmitting(false);
//                 setStep(3); // Passer à l'écran de succès
                
//                 // Ici, les données finales sont: formData
//                 console.log("Formulaire soumis:", formData); 
//             }, 2000); 
//         } else {
//              setSubmissionMessage("Veuillez corriger les erreurs avant de soumettre le formulaire.");
//         }
//     };
    
//     // Contenu de l'étape 3 (Succès)
//     const Step3 = () => (
//         <div className="text-center p-8">
//             <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-6" />
//             <h2 className="text-2xl font-bold text-white mb-2">Inscription Complétée avec Succès!</h2>
//             <p className="text-gray-300 mb-6">
//                 Votre demande de compte professionnel a été enregistrée. Un email de vérification a été envoyé à <span className="font-semibold text-indigo-400">{formData.email}</span>.
//             </p>
//             <p className="text-gray-400 text-sm">
//                 Veuillez vérifier vos courriels (y compris le dossier spam) et suivre les instructions pour activer votre compte et finaliser la conformité KYC/AML.
//             </p>
//             <button 
//                 onClick={() => setStep(1)} // Retourner à l'étape 1 ou rediriger vers la connexion
//                 className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
//             >
//                 Aller à la Page de Connexion
//             </button>
//         </div>
//     );


//     return (
//         <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
//             <div className="w-full max-w-md">
                
//                 <h1 className="text-4xl font-extrabold text-white text-center mb-2">
//                     <span className="text-indigo-500">Pro</span>Trade
//                 </h1>
//                 <p className="text-gray-400 text-center mb-8">
//                     Créez votre compte de trading professionnel sécurisé.
//                 </p>

//                 <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
                    
//                     {step < 3 && (
//                         <>
//                             <div className="flex justify-between items-center mb-6">
//                                 <h2 className="text-xl font-semibold text-white">
//                                     Étape {step} sur 2 : {step === 1 ? "Détails du Compte" : "Profil & Conformité"}
//                                 </h2>
//                                 <div className="text-sm text-indigo-400 font-medium">
//                                     Sécurité Financière 
//                                 </div>
//                             </div>
                            
//                             <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
//                                 <div 
//                                     className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500" 
//                                     style={{ width: `${step === 1 ? '50%' : '100%'}` }}
//                                 ></div>
//                             </div>
                            
//                             <MessageBox message={submissionMessage} type="error" />
//                             {isSubmitting && <MessageBox message="Envoi des données en cours..." type="info" />}

//                             {step === 1 && (
//                                 <Step1 formData={formData} handleChange={handleChange} nextStep={nextStep} errors={errors} />
//                             )}
//                             {step === 2 && (
//                                 <Step2 formData={formData} handleChange={handleChange} prevStep={prevStep} handleSubmit={handleSubmit} errors={errors} />
//                             )}
//                         </>
//                     )}

//                     {step === 3 && <Step3 />}
//                 </div>

//                 {step < 3 && (
//                     <p className="text-center text-gray-500 text-sm mt-6">
//                         Déjà inscrit ? <a href="#" className="text-indigo-400 hover:text-indigo-300 font-medium">Connectez-vous ici.</a>
//                     </p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Inscription;
