import React from 'react';

const About: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 animate-fadeIn pb-32">
            {/* Header / Mission Statement */}
            <header className="mb-20 md:mb-32 text-center max-w-3xl mx-auto">
                <p className="text-xs font-bold text-red-500 uppercase tracking-[0.3em] mb-6">Mission Statement</p>
                <h1 className="serif-font text-4xl md:text-6xl text-slate-900 mb-8 leading-tight tracking-tight">
                    Synthesizing the Silos <br className="hidden md:block" />
                    <span className="italic text-slate-500">of Neurodegeneration</span>
                </h1>
                <div className="w-24 h-px bg-red-400 mx-auto mt-12"></div>
            </header>

            <div className="prose prose-lg md:prose-xl prose-slate max-w-none">
                {/* Section I: The Challenge */}
                <section className="mb-20">
                    <div className="flex items-baseline gap-4 mb-8">
                        <span className="text-red-400 font-serif text-6xl leading-none">I.</span>
                        <h2 className="text-2xl md:text-3xl font-serif text-slate-900 m-0">The Challenge: A Fragmented Landscape</h2>
                    </div>

                    <p className="text-slate-600 leading-loose text-lg font-light mb-6">
                        For over a century, the field of neurodegeneration research has been defined as much by its divisions as by its discoveries. Since 1906, when Alois Alzheimer's description of "presenile dementia" captured the scientific imagination, the narrative has often narrowed around singular pathologies—most notably the "Amyloid Cascade Hypothesis." While this focus has generated invaluable data, it has also created deep silos. Virologists studying HSV-1 in Alzheimer's rarely converse with lysosomal biologists; geneticists identifying PSEN1 mutations often work in isolation from environmental toxicologists.
                    </p>

                    <p className="text-slate-600 leading-loose text-lg font-light mb-6">
                        Furthermore, the history of this science is fraught with what we might call "political erasure." As our analysis of early 20th-century neuropathology reveals, the contributions of Oskar Fischer—who described the "inside-out" formation of plaques and their "drusiform" (gland-like) necrosis—were largely sidelined in favor of the Munich School's amyloid-centric model. This historical narrowing has had a cost: we effectively "lost" a paradigm that accurately described the cellular mechanism of dementia for nearly 100 years.
                    </p>

                    <div className="bg-slate-900 text-white p-8 md:p-10 rounded-sm my-10">
                        <p className="text-slate-300 leading-relaxed text-lg font-light m-0">
                            <span className="text-red-400 font-bold">AdultCognitiveDisease.com</span> was founded to correct this fragmentation. We believe the answers to neurodegeneration are already present in the scientific literature—they are simply disconnected, buried across millions of papers and spanning disparate disciplines that speak different technical languages.
                        </p>
                    </div>
                </section>

                {/* Section II: Methodology */}
                <section className="mb-20">
                    <div className="flex items-baseline gap-4 mb-8">
                        <span className="text-red-400 font-serif text-6xl leading-none">II.</span>
                        <h2 className="text-2xl md:text-3xl font-serif text-slate-900 m-0">Our Methodology: AI Deep Research as a Synthesis Engine</h2>
                    </div>

                    <p className="text-slate-600 leading-loose text-lg font-light mb-6">
                        This project began with a systematic review of all 150+ submissions to the 2022 Oskar Fischer Prize—a competition seeking novel hypotheses for Alzheimer's causation. Through that process, we developed a methodology for AI-assisted literature synthesis that we now apply more broadly.
                    </p>

                    <p className="text-slate-600 leading-loose text-lg font-light mb-6">
                        We do not aim to replace human scientific inquiry but to augment it with a scale of synthesis that was previously impossible. Our methodology utilizes state-of-the-art AI Deep Research tools to conduct "bias-reduced" literature reviews.
                    </p>

                    <p className="text-slate-500 text-lg font-light mb-8">
                        Unlike a standard search engine or a generative chatbot, our system is designed to:
                    </p>

                    <div className="space-y-6 mb-10">
                        <div className="flex gap-6 items-start group">
                            <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-sm flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                                <span className="text-red-500 font-bold text-sm">01</span>
                            </div>
                            <div>
                                <h4 className="font-serif text-xl text-slate-900 mb-2">Ingest and Cross-Reference</h4>
                                <p className="text-slate-600 text-base leading-relaxed font-light m-0">
                                    We process primary sources ranging from archival German neuropathology texts of 1907 to molecular biology papers from 2024.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-start group">
                            <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-sm flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                                <span className="text-red-500 font-bold text-sm">02</span>
                            </div>
                            <div>
                                <h4 className="font-serif text-xl text-slate-900 mb-2">Identify Convergent Patterns</h4>
                                <p className="text-slate-600 text-base leading-relaxed font-light m-0">
                                    We instruct our AI to look for mechanistic overlaps between distinct fields—for example, mapping the "club-shaped neurites" described by Oskar Fischer in 1907 directly onto the "dystrophic neurites" filled with autophagic vacuoles described by Dr. Ralph Nixon in 2024.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6 items-start group">
                            <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-sm flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                                <span className="text-red-500 font-bold text-sm">03</span>
                            </div>
                            <div>
                                <h4 className="font-serif text-xl text-slate-900 mb-2">Construct Causal Networks</h4>
                                <p className="text-slate-600 text-base leading-relaxed font-light m-0">
                                    Instead of viewing diseases as lists of symptoms, we model them as failures of cellular systems. We trace how upstream triggers (genes, viruses, toxins) converge on downstream bottlenecks.
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-slate-800 leading-loose text-lg md:text-xl font-serif italic border-l-4 border-red-200 pl-6 my-10">
                        We are not claiming to have "solved" Alzheimer's. Rather, we are presenting a computational synthesis—a data-driven roadmap that connects the dots human researchers may miss due to hyper-specialization.
                    </p>
                </section>

                {/* Section III: Proof of Concept */}
                <section className="mb-20">
                    <div className="flex items-baseline gap-4 mb-8">
                        <span className="text-red-400 font-serif text-6xl leading-none">III.</span>
                        <h2 className="text-2xl md:text-3xl font-serif text-slate-900 m-0">Proof of Concept: The Theory of "Convergent Autophagic Collapse"</h2>
                    </div>

                    <p className="text-slate-600 leading-loose text-lg font-light mb-6">
                        To demonstrate the power of this approach, our initial deep research has culminated in a unifying framework we term <strong className="text-slate-900">Convergent Autophagic Collapse</strong>. This theory reconciles the "Amyloid" vs. "Tau" vs. "Infection" debates by identifying the lysosome (the cell's waste disposal unit) as the single point of failure where all these pathways meet.
                    </p>

                    <p className="text-slate-500 text-lg font-light mb-8">
                        Our synthesis reveals a coherent narrative that spans a century of science:
                    </p>

                    <div className="bg-slate-50 p-8 md:p-10 rounded-sm border border-slate-100 mb-10">
                        <div className="space-y-8">
                            <div>
                                <h4 className="font-serif text-xl text-slate-900 mb-3 flex items-center gap-3">
                                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                                    The Historical Insight
                                </h4>
                                <p className="text-slate-600 text-base leading-relaxed font-light m-0 pl-5">
                                    In 1907, Oskar Fischer argued that senile plaques were not merely extracellular deposits, but "miliary necroses"—the debris fields of neurons that had died from the inside out. He likened them to "bacterial colonies" because of their radial, expanding nature.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-serif text-xl text-slate-900 mb-3 flex items-center gap-3">
                                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                                    The Modern Mechanism
                                </h4>
                                <p className="text-slate-600 text-base leading-relaxed font-light m-0 pl-5">
                                    Modern ultrastructural analysis by Dr. Ralph Nixon validates Fischer's intuition. We now know that plaques are born from PANTHOS neurons ("Poisonous Flowers")—neurons that have become engorged with undigested autophagic vacuoles because their lysosomes have failed to acidify.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-serif text-xl text-slate-900 mb-3 flex items-center gap-3">
                                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                                    The Convergence
                                </h4>
                                <p className="text-slate-600 text-base leading-relaxed font-light m-0 pl-5 mb-4">
                                    Our AI review identified that this lysosomal failure is the shared downstream effect of seemingly unrelated triggers:
                                </p>
                                <ul className="text-slate-600 text-base leading-relaxed font-light m-0 pl-5 space-y-2 list-none">
                                    <li className="flex gap-3">
                                        <span className="text-red-400 font-bold shrink-0">Genetic:</span>
                                        <span>PSEN1 mutations prevent the v-ATPase proton pump from acidifying the lysosome.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-400 font-bold shrink-0">Viral:</span>
                                        <span>HSV-1 infection mimics genetic defects by sequestering Beclin-1 and stalling autophagy.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-400 font-bold shrink-0">Oxidative:</span>
                                        <span>Mitochondrial stress generates HNE (a lipid peroxidation product) that physically gums up the lysosomal proton pump.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <p className="text-slate-800 leading-loose text-lg md:text-xl font-serif italic border-l-4 border-slate-300 pl-6 my-10">
                        In this model, the amyloid plaque is neither the sole cause nor a bystander; it is the tombstone of a neuron that succumbed to autophagic collapse. This synthesis explains why removing the plaque (the tombstone) has not cured the disease—it does not fix the broken waste-disposal machinery in the surviving neurons.
                    </p>
                </section>

                {/* Section IV: Addressing Criticism */}
                <section className="mb-20">
                    <div className="flex items-baseline gap-4 mb-8">
                        <span className="text-red-400 font-serif text-6xl leading-none">IV.</span>
                        <h2 className="text-2xl md:text-3xl font-serif text-slate-900 m-0">Addressing Criticism and Limitations</h2>
                    </div>

                    <p className="text-slate-600 leading-loose text-lg font-light mb-10">
                        We anticipate skepticism regarding the use of AI in high-stakes scientific interpretation. Below, we address three primary criticisms proactively:
                    </p>

                    <div className="space-y-8">
                        <div className="border-l-2 border-slate-200 pl-6 hover:border-red-300 transition-colors">
                            <h4 className="font-serif text-lg text-slate-900 mb-3">
                                <span className="text-slate-400 mr-2">Criticism 1:</span>
                                "AI hallucinates and invents facts."
                            </h4>
                            <p className="text-slate-600 text-base leading-relaxed font-light m-0">
                                <strong className="text-slate-700">Our Response:</strong> We treat AI not as an author, but as an analyst. Every claim in our synthesis is tethered to a specific citation in the peer-reviewed literature. For instance, the connection between PSEN1 mutations and lysosomal acidification is not an AI invention; it is based on rigorous experimental data from Lee et al. (2010) and Nixon (2024). Our AI's role is to locate these papers and highlight their relevance to the broader pattern.
                            </p>
                        </div>

                        <div className="border-l-2 border-slate-200 pl-6 hover:border-red-300 transition-colors">
                            <h4 className="font-serif text-lg text-slate-900 mb-3">
                                <span className="text-slate-400 mr-2">Criticism 2:</span>
                                "This is revisionist history."
                            </h4>
                            <p className="text-slate-600 text-base leading-relaxed font-light m-0">
                                <strong className="text-slate-700">Our Response:</strong> It is indeed revisionist, but necessary. The "standard model" of Alzheimer's history marginalized Oskar Fischer for political reasons, effectively burying his "inside-out" plaque hypothesis for decades. Our goal is to restore these lost paradigms when modern data validates them. We are not rewriting history; we are completing it.
                            </p>
                        </div>

                        <div className="border-l-2 border-slate-200 pl-6 hover:border-red-300 transition-colors">
                            <h4 className="font-serif text-lg text-slate-900 mb-3">
                                <span className="text-slate-400 mr-2">Criticism 3:</span>
                                "Biology is too nuanced for a 'Unified Theory'."
                            </h4>
                            <p className="text-slate-600 text-base leading-relaxed font-light m-0">
                                <strong className="text-slate-700">Our Response:</strong> We acknowledge that neurodegeneration is complex. However, complexity often masks simple underlying principles. Just as cancer research found convergence in the "Hallmarks of Cancer," we propose that Autophagic Collapse is a hallmark of neurodegeneration. We do not claim this explains every variability, but it offers a thermodynamically sound explanation for why diverse insults—from head trauma to herpes—kill neurons in the same specific way.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section V: Invitation */}
                <section className="mb-12">
                    <div className="flex items-baseline gap-4 mb-8">
                        <span className="text-red-400 font-serif text-6xl leading-none">V.</span>
                        <h2 className="text-2xl md:text-3xl font-serif text-slate-900 m-0">An Invitation to Collaborate</h2>
                    </div>

                    <p className="text-slate-600 leading-loose text-lg font-light mb-6">
                        AdultCognitiveDisease.com is an open experiment in scientific synthesis. We invite academics, clinicians, and the public to review our "living literature reviews." Challenge our connections, propose new data sources, and help us refine this model.
                    </p>

                    <div className="bg-gradient-to-r from-red-50 to-slate-50 p-8 md:p-10 rounded-sm border border-red-100 text-center">
                        <p className="text-slate-700 leading-relaxed text-xl font-serif italic m-0">
                            By looking past the silos and using the best tools of the 21st century, we hope to honor the observations of the 20th century—and finally pave the way for the cures of the future.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
