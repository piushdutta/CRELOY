import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Canvas, Rect, Circle, Triangle, IText, FabricImage, Ellipse, Polygon, Line } from 'fabric';
import {
    Square, Circle as CircleIcon, Triangle as TriangleIcon, Star as StarIcon,
    Hexagon as HexagonIcon, Diamond as DiamondIcon, Minus,
    Type, Image as ImageIcon, Download, Undo, Redo,
    Trash2, ZoomIn, ZoomOut,
    Bold, Italic, AlignLeft,
    Settings2, Sparkles, MousePointer2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

/**
 * Creloy Editor Component
 * Refined with Website Theme (Brown & Cream)
 */
const Editor = () => {
    const canvasRef = useRef(null);
    const fabricCanvas = useRef(null);
    const containerRef = useRef(null);

    const [selectedObject, setSelectedObject] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [activePanel, setActivePanel] = useState('elements');
    const [errorMessage, setErrorMessage] = useState('');
    const { state } = useLocation();
    const navigate = useNavigate();

    const showError = useCallback((msg) => {
        setErrorMessage(msg);
        setTimeout(() => setErrorMessage(''), 4000);
    }, []);

    useEffect(() => {
        let canvas;
        try {
            if (!canvasRef.current) throw new Error("Canvas element not found");

            canvas = new Canvas(canvasRef.current, {
                width: 800,
                height: 500,
                backgroundColor: '#ffffff',
                preserveObjectStacking: true,
            });
            fabricCanvas.current = canvas;
        } catch (err) {
            showError("Failed to initialize design canvas.");
            return;
        }

        const handleSelection = () => {
            const active = canvas.getActiveObject();
            setSelectedObject(active);
        };

        canvas.on({
            'selection:created': handleSelection,
            'selection:updated': handleSelection,
            'selection:cleared': () => setSelectedObject(null),
        });

        const syncSelection = () => {
            const active = canvas.getActiveObject();
            if (active) setSelectedObject({ ...active });
        };
        canvas.on({
            'object:moving': syncSelection,
            'object:scaling': syncSelection,
            'object:rotating': syncSelection,
            'object:skewing': syncSelection,
        });

        const styleObject = (obj) => {
            obj.set({
                cornerColor: '#4a3728',
                cornerStyle: 'circle',
                cornerSize: 10,
                transparentCorners: false,
                borderColor: '#4a3728',
                borderDashArray: [3, 3]
            });
        };
        canvas.on('object:added', (e) => styleObject(e.target));

        const welcomeText = new IText('Creloy Designer', {
            left: 200,
            top: 200,
            fontFamily: 'Outfit',
            fontSize: 40,
            fill: '#4a3728'
        });
        canvas.add(welcomeText);
        canvas.setActiveObject(welcomeText);

        if (state?.asset) {
            const imgElement = new Image();
            imgElement.src = state.asset.image;
            imgElement.onload = () => {
                const fabricImg = new FabricImage(imgElement, {
                    left: 100,
                    top: 100,
                    scaleX: 0.5,
                    scaleY: 0.5
                });
                canvas.add(fabricImg);
                canvas.requestRenderAll();
            };
        }

        const handleKeyDown = (e) => {
            if ((e.key === 'Delete' || e.key === 'Backspace') && !canvas.isEditing) {
                const activeObjects = canvas.getActiveObjects();
                if (activeObjects.length > 0) {
                    canvas.discardActiveObject();
                    canvas.remove(...activeObjects);
                    canvas.requestRenderAll();
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            canvas.dispose();
        };
    }, []);

    // Tool Operations
    const addRectAt = useCallback((x, y) => {
        const rect = new Rect({ left: x - 50, top: y - 50, fill: '#4a3728', width: 100, height: 100, rx: 8, ry: 8 });
        fabricCanvas.current.add(rect);
        fabricCanvas.current.setActiveObject(rect);
    }, []);

    const addCircleAt = useCallback((x, y) => {
        const circle = new Circle({ left: x - 50, top: y - 50, fill: '#4a3728', radius: 50 });
        fabricCanvas.current.add(circle);
        fabricCanvas.current.setActiveObject(circle);
    }, []);

    const addTriangleAt = useCallback((x, y) => {
        const triangle = new Triangle({ left: x - 50, top: y - 50, fill: '#4a3728', width: 100, height: 100 });
        fabricCanvas.current.add(triangle);
        fabricCanvas.current.setActiveObject(triangle);
    }, []);

    const addEllipseAt = useCallback((x, y) => {
        const ellipse = new Ellipse({ left: x - 50, top: y - 30, fill: '#4a3728', rx: 50, ry: 30 });
        fabricCanvas.current.add(ellipse);
        fabricCanvas.current.setActiveObject(ellipse);
    }, []);

    const addStarAt = useCallback((x, y) => {
        const points = [];
        const numPoints = 5;
        const outerRadius = 50;
        const innerRadius = 20;
        for (let i = 0; i < numPoints * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (Math.PI / numPoints) * i;
            points.push({ x: radius * Math.sin(angle), y: -radius * Math.cos(angle) });
        }
        const star = new Polygon(points, { left: x - 50, top: y - 50, fill: '#4a3728' });
        fabricCanvas.current.add(star);
        fabricCanvas.current.setActiveObject(star);
    }, []);

    const addHexagonAt = useCallback((x, y) => {
        const points = [];
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            points.push({ x: 50 * Math.sin(angle), y: -50 * Math.cos(angle) });
        }
        const hexagon = new Polygon(points, { left: x - 50, top: y - 50, fill: '#4a3728' });
        fabricCanvas.current.add(hexagon);
        fabricCanvas.current.setActiveObject(hexagon);
    }, []);

    const addDiamondAt = useCallback((x, y) => {
        const diamond = new Rect({ left: x, top: y - 50, fill: '#4a3728', width: 70, height: 70, angle: 45 });
        fabricCanvas.current.add(diamond);
        fabricCanvas.current.setActiveObject(diamond);
    }, []);

    const addLineAt = useCallback((x, y) => {
        const line = new Line([x - 50, y, x + 50, y], { stroke: '#4a3728', strokeWidth: 4, left: x - 50, top: y - 2 });
        fabricCanvas.current.add(line);
        fabricCanvas.current.setActiveObject(line);
    }, []);

    const addTextAt = useCallback((x, y, options = {}) => {
        const text = new IText(options.text || 'Add your text', {
            left: x - 50,
            top: y - 10,
            fontFamily: 'Outfit',
            fontSize: options.fontSize || 24,
            fontWeight: options.fontWeight || 'normal',
            fill: '#4a3728'
        });
        fabricCanvas.current.add(text);
        fabricCanvas.current.setActiveObject(text);
    }, []);

    const addRect = () => addRectAt(fabricCanvas.current.width / 2, fabricCanvas.current.height / 2);
    const addCircle = () => addCircleAt(fabricCanvas.current.width / 2, fabricCanvas.current.height / 2);
    const addTriangle = () => addTriangleAt(fabricCanvas.current.width / 2, fabricCanvas.current.height / 2);
    const addEllipse = () => addEllipseAt(fabricCanvas.current.width / 2, fabricCanvas.current.height / 2);
    const addStar = () => addStarAt(fabricCanvas.current.width / 2, fabricCanvas.current.height / 2);
    const addHexagon = () => addHexagonAt(fabricCanvas.current.width / 2, fabricCanvas.current.height / 2);
    const addDiamond = () => addDiamondAt(fabricCanvas.current.width / 2, fabricCanvas.current.height / 2);
    const addLine = () => addLineAt(fabricCanvas.current.width / 2, fabricCanvas.current.height / 2);
    const addText = (preset = 'body') => {
        const center = { x: fabricCanvas.current.width / 2, y: fabricCanvas.current.height / 2 };
        const styles = {
            heading: { text: 'Add a Heading', fontSize: 48, fontWeight: 'bold' },
            subheading: { text: 'Add a Subheading', fontSize: 32, fontWeight: 'medium' },
            body: { text: 'Add body text', fontSize: 18, fontWeight: 'normal' }
        };
        addTextAt(center.x, center.y, styles[preset] || styles.body);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (f) => {
            const imgElement = new Image();
            imgElement.src = f.target.result;
            imgElement.onload = () => {
                const fabricImg = new FabricImage(imgElement, { left: 50, top: 50, scaleX: 0.5, scaleY: 0.5 });
                fabricCanvas.current.add(fabricImg);
                fabricCanvas.current.setActiveObject(fabricImg);
                fabricCanvas.current.renderAll();
            };
        };
        reader.readAsDataURL(file);
    };

    const updateColor = (color) => {
        if (!selectedObject) return;
        selectedObject.set(selectedObject instanceof Line ? 'stroke' : 'fill', color);
        fabricCanvas.current.renderAll();
        setSelectedObject({ ...selectedObject, [selectedObject instanceof Line ? 'stroke' : 'fill']: color });
    };

    const updateFontSize = (size) => {
        if (!selectedObject || !(selectedObject instanceof IText)) return;
        selectedObject.set('fontSize', parseInt(size) || 12);
        fabricCanvas.current.renderAll();
        setSelectedObject({ ...selectedObject, fontSize: parseInt(size) });
    };

    const toggleFontStyle = (style) => {
        if (!selectedObject || !(selectedObject instanceof IText)) return;
        const current = selectedObject.fontStyle;
        selectedObject.set('fontStyle', current === style ? 'normal' : style);
        fabricCanvas.current.renderAll();
        setSelectedObject({ ...selectedObject, fontStyle: current === style ? 'normal' : style });
    };

    const toggleFontWeight = () => {
        if (!selectedObject || !(selectedObject instanceof IText)) return;
        const current = selectedObject.fontWeight;
        selectedObject.set('fontWeight', current === 'bold' ? 'normal' : 'bold');
        fabricCanvas.current.renderAll();
        setSelectedObject({ ...selectedObject, fontWeight: current === 'bold' ? 'normal' : 'bold' });
    };

    const updateTextAlignment = (align) => {
        if (!selectedObject || !(selectedObject instanceof IText)) return;
        selectedObject.set('textAlign', align);
        fabricCanvas.current.renderAll();
        setSelectedObject({ ...selectedObject, textAlign: align });
    };

    const updateFontFamily = (family) => {
        if (!selectedObject || !(selectedObject instanceof IText)) return;
        selectedObject.set('fontFamily', family);
        fabricCanvas.current.renderAll();
        setSelectedObject({ ...selectedObject, fontFamily: family });
    };

    const updateOpacity = (value) => {
        if (!selectedObject) return;
        selectedObject.set('opacity', parseFloat(value) / 100);
        fabricCanvas.current.renderAll();
        setSelectedObject({ ...selectedObject, opacity: parseFloat(value) / 100 });
    };

    const deleteSelected = () => {
        const active = fabricCanvas.current.getActiveObjects();
        fabricCanvas.current.remove(...active);
        fabricCanvas.current.discardActiveObject();
    };

    const updateZoom = (newZoom) => {
        const limitedZoom = Math.min(Math.max(newZoom, 0.1), 3);
        setZoom(limitedZoom);
        fabricCanvas.current.setZoom(limitedZoom);
        fabricCanvas.current.renderAll();
    };

    const exportImage = (format = 'png') => {
        const dataURL = fabricCanvas.current.toDataURL({ format, quality: 1, multiplier: 2 });
        const link = document.createElement('a');
        link.download = `creloy-design.${format}`;
        link.href = dataURL;
        link.click();
    };

    const handleDragStart = (e, type) => e.dataTransfer.setData('toolType', type);
    const handleDrop = (e) => {
        e.preventDefault();
        const type = e.dataTransfer.getData('toolType');
        const pointer = fabricCanvas.current.getPointer(e);
        switch (type) {
            case 'rect': addRectAt(pointer.x, pointer.y); break;
            case 'circle': addCircleAt(pointer.x, pointer.y); break;
            case 'triangle': addTriangleAt(pointer.x, pointer.y); break;
            case 'ellipse': addEllipseAt(pointer.x, pointer.y); break;
            case 'star': addStarAt(pointer.x, pointer.y); break;
            case 'hexagon': addHexagonAt(pointer.x, pointer.y); break;
            case 'diamond': addDiamondAt(pointer.x, pointer.y); break;
            case 'line': addLineAt(pointer.x, pointer.y); break;
            case 'text': addTextAt(pointer.x, pointer.y, { text: 'New Text', fontSize: 24 }); break;
            default: break;
        }
    };

    return (
        <div className="h-screen w-full flex flex-col overflow-hidden bg-[#f4f1ea] text-[#4a3728] select-none relative">
            {/* The Navbar from the website */}
            <Navbar />

            {/* Content properly pushed below Navbar */}
            <div className="flex flex-1 min-h-0 relative mt-[130px] z-10">

                {/* --- Secondary Float Toolbar --- */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-white/40 backdrop-blur-xl border border-white/60 p-2 rounded-2xl shadow-xl">
                    <div className="flex items-center gap-1 bg-white/40 rounded-xl p-1">
                        <button onClick={() => updateZoom(zoom - 0.1)} className="p-2 hover:bg-white/60 rounded-lg text-[#4a3728]/60 transition-colors"><ZoomOut size={18} /></button>
                        <span className="w-16 text-center text-sm font-bold text-[#4a3728]">{Math.round(zoom * 100)}%</span>
                        <button onClick={() => updateZoom(zoom + 0.1)} className="p-2 hover:bg-white/60 rounded-lg text-[#4a3728]/60 transition-colors"><ZoomIn size={18} /></button>
                    </div>

                    <div className="h-8 w-[1px] bg-[#4a3728]/10" />

                    <div className="flex items-center gap-1">
                        <ToolbarBtn icon={<Undo size={18} />} onClick={() => { }} />
                        <ToolbarBtn icon={<Redo size={18} />} onClick={() => { }} />
                    </div>

                    <div className="h-8 w-[1px] bg-[#4a3728]/10" />

                    <div className="relative group">
                        <button className="flex items-center gap-2 bg-[#4a3728] hover:bg-[#2d1f15] text-[#f4f1ea] px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg hover:scale-[1.02] active:scale-95">
                            <Download size={18} />
                            <span>Export Design</span>
                        </button>
                        <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[#4a3728]/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 z-[100] backdrop-blur-xl">
                            <button onClick={() => exportImage('png')} className="w-full text-left px-4 py-3 hover:bg-[#f4f1ea] rounded-xl text-sm text-[#4a3728] transition-colors flex items-center justify-between">
                                <span className="font-bold">PNG Image</span>
                                <span className="text-[10px] bg-[#4a3728]/10 px-2 py-0.5 rounded text-[#4a3728]/60 font-black">HD</span>
                            </button>
                            <button onClick={() => exportImage('jpeg')} className="w-full text-left px-4 py-3 hover:bg-[#f4f1ea] rounded-xl text-sm text-[#4a3728] transition-colors flex items-center justify-between">
                                <span className="font-bold">JPG Graphics</span>
                                <span className="text-[10px] bg-[#4a3728]/10 px-2 py-0.5 rounded text-[#4a3728]/60 font-black">LITE</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- Left Sidebar --- */}
                <aside className="w-[84px] bg-white/30 backdrop-blur-xl border-r border-[#4a3728]/10 flex flex-col items-center py-6 gap-6 z-40">
                    <SidebarBtn icon={<MousePointer2 size={22} />} label="Select" active={activePanel === 'select'} onClick={() => setActivePanel('select')} />
                    <SidebarBtn icon={<Sparkles size={22} />} label="Pro" active={activePanel === 'templates'} onClick={() => setActivePanel('templates')} />
                    <SidebarBtn icon={<Square size={22} />} label="Shapes" active={activePanel === 'elements'} onClick={() => setActivePanel('elements')} />
                    <SidebarBtn icon={<Type size={22} />} label="Text" active={activePanel === 'text'} onClick={() => setActivePanel('text')} />
                    <SidebarBtn icon={<ImageIcon size={22} />} label="Upload" active={activePanel === 'uploads'} onClick={() => setActivePanel('uploads')} />
                    <div className="mt-auto">
                        <SidebarBtn icon={<Settings2 size={22} />} label="Setup" active={activePanel === 'settings'} onClick={() => setActivePanel('settings')} />
                    </div>
                </aside>

                {/* --- Middle Side Panel --- */}
                <div className="w-[340px] bg-white/50 backdrop-blur-2xl border-r border-[#4a3728]/10 flex flex-col z-30 shadow-xl overflow-hidden">
                    <div className="px-6 py-5 border-b border-[#4a3728]/5 flex items-center justify-between bg-white/20">
                        <h3 className="text-lg font-black text-[#4a3728] capitalize tracking-tight">{activePanel}</h3>
                        <div className="w-2 h-2 bg-[#d2b48c] rounded-full shadow-[0_0_10px_#d2b48c]" />
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                        {activePanel === 'elements' && (
                            <div className="grid grid-cols-2 gap-4">
                                <ShapeItem icon={<Square size={28} />} type="rect" onDragStart={handleDragStart} onClick={addRect} />
                                <ShapeItem icon={<CircleIcon size={28} />} type="circle" onDragStart={handleDragStart} onClick={addCircle} />
                                <ShapeItem icon={<TriangleIcon size={28} />} type="triangle" onDragStart={handleDragStart} onClick={addTriangle} />
                                <ShapeItem icon={<div className="w-10 h-6 border-2 border-current rounded-[50%]" />} type="ellipse" onDragStart={handleDragStart} onClick={addEllipse} />
                                <ShapeItem icon={<StarIcon size={28} />} type="star" onDragStart={handleDragStart} onClick={addStar} />
                                <ShapeItem icon={<HexagonIcon size={28} />} type="hexagon" onDragStart={handleDragStart} onClick={addHexagon} />
                                <ShapeItem icon={<DiamondIcon size={28} />} type="diamond" onDragStart={handleDragStart} onClick={addDiamond} />
                                <ShapeItem icon={<Minus size={28} />} type="line" onDragStart={handleDragStart} onClick={addLine} />
                            </div>
                        )}
                        {activePanel === 'text' && (
                            <div className="space-y-4">
                                <button className="w-full group bg-white hover:bg-[#4a3728] border border-[#4a3728]/5 rounded-2xl transition-all p-6 text-left shadow-sm hover:shadow-xl hover:-translate-y-1" onClick={() => addText('heading')}>
                                    <div className="text-2xl font-black text-[#4a3728] group-hover:text-[#f4f1ea] transition-colors mb-1">Add Heading</div>
                                    <div className="text-[10px] text-[#4a3728]/40 group-hover:text-[#f4f1ea]/60 uppercase tracking-widest font-bold">Outfit • 48pt</div>
                                </button>
                                <button className="w-full group bg-white/60 hover:bg-[#4a3728] border border-[#4a3728]/5 rounded-2xl transition-all p-5 text-left shadow-sm hover:shadow-lg hover:-translate-y-0.5" onClick={() => addText('subheading')}>
                                    <div className="text-lg font-bold text-[#4a3728] group-hover:text-[#f4f1ea] transition-colors mb-1">Add Subheading</div>
                                    <div className="text-[10px] text-[#4a3728]/40 group-hover:text-[#f4f1ea]/60 uppercase tracking-widest font-bold">Bold • 32pt</div>
                                </button>
                                <button className="w-full group bg-white/40 hover:bg-[#4a3728] border border-[#4a3728]/5 rounded-2xl transition-all p-4 text-left shadow-sm hover:shadow-md" onClick={() => addText('body')}>
                                    <div className="text-sm font-medium text-[#4a3728] group-hover:text-[#f4f1ea] transition-colors mb-1">Add body text</div>
                                    <div className="text-[10px] text-[#4a3728]/40 group-hover:text-[#f4f1ea]/60 uppercase tracking-widest font-bold">Regular • 18pt</div>
                                </button>
                            </div>
                        )}
                        {activePanel === 'uploads' && (
                            <label className="w-full h-44 border-2 border-dashed border-[#4a3728]/10 hover:border-[#4a3728]/50 hover:bg-white/40 rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer transition-all">
                                <div className="p-4 bg-white rounded-2xl shadow-sm"><ImageIcon className="text-[#4a3728]/40" size={32} /></div>
                                <span className="text-xs text-[#4a3728]/60 font-black uppercase tracking-widest">Select Files</span>
                                <input type="file" hidden onChange={handleImageUpload} accept="image/*" />
                            </label>
                        )}
                        {(activePanel === 'templates' || activePanel === 'select' || activePanel === 'settings') && (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                                <div className="w-16 h-16 bg-[#4a3728]/5 rounded-3xl flex items-center justify-center">
                                    <Sparkles size={32} className="text-[#d2b48c]" />
                                </div>
                                <h4 className="text-md font-black text-[#4a3728]">Select an Element</h4>
                                <p className="text-xs text-[#7c6a5a] leading-relaxed">Click any object on the canvas to customize its properties.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- Main Canvas Area --- */}
                <main className="flex-1 flex flex-col bg-[#eeebe3] relative overflow-hidden" ref={containerRef} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                    {/* Floating Property Bar when an element is selected */}
                    {selectedObject && (
                        <div className="absolute top-[80px] left-1/2 -translate-x-1/2 flex items-center gap-3 bg-[#4a3728] p-2.5 rounded-2xl shadow-2xl border border-white/10 z-[100] transition-all">
                            <div className="flex items-center gap-3 px-3 border-r border-white/10">
                                <div className="relative w-8 h-8 rounded-lg overflow-hidden border-2 border-white/20 cursor-pointer shadow-sm">
                                    <input type="color" className="absolute -inset-2 w-[200%] h-[200%] cursor-pointer"
                                        value={selectedObject instanceof Line ? (selectedObject.stroke || '#4a3728') : (selectedObject.fill || '#4a3728')}
                                        onChange={(e) => updateColor(e.target.value)} />
                                </div>
                            </div>

                            {selectedObject instanceof IText && (
                                <>
                                    <select className="bg-white/10 border-none text-xs text-white/90 rounded-xl px-4 py-2.5 focus:ring-0 outline-none cursor-pointer font-bold"
                                        value={selectedObject.fontFamily} onChange={(e) => updateFontFamily(e.target.value)}>
                                        <option value="Outfit">Outfit</option>
                                        <option value="Inter">Inter</option>
                                        <option value="serif">Serif</option>
                                    </select>
                                    <input type="number" className="w-16 bg-white/10 border-none text-xs text-center text-white/90 rounded-xl py-2.5 outline-none font-bold"
                                        value={Math.round(selectedObject.fontSize)} onChange={(e) => updateFontSize(e.target.value)} />
                                    <div className="w-[1px] h-6 bg-white/10" />
                                    <PropertyBtn icon={<Bold size={16} />} active={selectedObject.fontWeight === 'bold'} onClick={toggleFontWeight} />
                                    <PropertyBtn icon={<Italic size={16} />} active={selectedObject.fontStyle === 'italic'} onClick={() => toggleFontStyle('italic')} />
                                    <PropertyBtn icon={<AlignLeft size={16} />} active={selectedObject.textAlign === 'left'} onClick={() => updateTextAlignment('left')} />
                                </>
                            )}

                            <div className="flex items-center gap-3 px-3 border-x border-white/10 mx-1">
                                <input type="range" min="0" max="100" className="w-24 accent-[#d2b48c] h-1.5"
                                    value={Math.round(selectedObject.opacity * 100)} onChange={(e) => updateOpacity(e.target.value)} />
                                <span className="text-[11px] font-black text-white/60 w-10">{Math.round(selectedObject.opacity * 100)}%</span>
                            </div>

                            <button onClick={deleteSelected} className="p-2.5 hover:bg-red-500 text-white rounded-xl transition-all shadow-lg active:scale-95"><Trash2 size={20} /></button>
                        </div>
                    )}

                    <div className="flex-1 flex items-center justify-center p-16 overflow-auto custom-scrollbar">
                        <div className="bg-white shadow-[0_50px_120px_-30px_rgba(74,55,40,0.2)] rounded-sm overflow-hidden">
                            <canvas ref={canvasRef} />
                        </div>
                    </div>
                </main>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(74,55,40,0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(74,55,40,0.2); }
            `}</style>
        </div>
    );
};

// Internal Components
const SidebarBtn = ({ icon, label, active, onClick }) => (
    <button onClick={onClick} className={`w-16 h-16 flex flex-col items-center justify-center gap-1.5 rounded-2xl transition-all hover:scale-105 active:scale-95 ${active ? 'bg-[#4a3728] text-[#f4f1ea] shadow-2xl shadow-[#4a3728]/40' : 'text-[#4a3728]/40 hover:bg-[#4a3728]/5 hover:text-[#4a3728]/80'}`}>
        {icon}
        <span className="text-[10px] font-black uppercase tracking-tighter">{label}</span>
    </button>
);

const ShapeItem = ({ icon, type, onDragStart, onClick }) => (
    <div draggable="true" onDragStart={(e) => onDragStart(e, type)} onClick={onClick}
        className="aspect-square bg-white/60 border border-[#4a3728]/5 rounded-[22px] flex items-center justify-center cursor-pointer hover:shadow-2xl hover:border-[#d2b48c] hover:scale-110 hover:-rotate-3 transition-all text-[#4a3728]/40 hover:text-[#4a3728]">
        {icon}
    </div>
);

const ToolbarBtn = ({ icon, onClick }) => (
    <button onClick={onClick} className="p-3 text-[#4a3728]/60 hover:text-[#4a3728] hover:bg-white/60 rounded-xl transition-all active:scale-90">{icon}</button>
);

const PropertyBtn = ({ icon, active, onClick, title }) => (
    <button onClick={onClick} title={title} className={`p-2.5 rounded-xl transition-all ${active ? 'bg-[#d2b48c] text-[#4a3728]' : 'text-white/40 hover:bg-white/10 hover:text-white'}`}>
        {icon}
    </button>
);

export default Editor;
