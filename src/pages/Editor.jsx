import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Canvas, Rect, Circle, Triangle, IText, FabricImage, Ellipse, Polygon, Line } from 'fabric';
import {
    Square, Circle as CircleIcon, Triangle as TriangleIcon, Star as StarIcon,
    Hexagon as HexagonIcon, Diamond as DiamondIcon, Minus,
    Type, Image as ImageIcon, Download, Undo, Redo,
    Trash2, Layers, ZoomIn, ZoomOut,
    Bold, Italic, AlignLeft, AlignCenter, AlignRight
} from 'lucide-react';

/**
 * Creloy Editor Component
 * A high-performance Canva-like graphic design editor using Fabric.js and Tailwind CSS.
 */
const Editor = () => {
    // Refs for Canvas and UI Containers
    const canvasRef = useRef(null);
    const fabricCanvas = useRef(null);
    const containerRef = useRef(null);

    // Editor State
    const [selectedObject, setSelectedObject] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [activePanel, setActivePanel] = useState('elements');
    const [errorMessage, setErrorMessage] = useState('');
    const { state } = useLocation();
    const navigate = useNavigate();

    // Centralized Error Handler
    const showError = useCallback((msg) => {
        setErrorMessage(msg);
        setTimeout(() => setErrorMessage(''), 4000);
    }, []);

    // -------------------------------------------------------------------------
    // Canvas Initialization & Lifecycle
    // -------------------------------------------------------------------------

    useEffect(() => {
        // Initialize Fabric Canvas
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
            console.error(err);
            return;
        }

        // Selection Handlers
        const handleSelection = () => {
            const active = canvas.getActiveObject();
            setSelectedObject(active);
        };

        canvas.on({
            'selection:created': handleSelection,
            'selection:updated': handleSelection,
            'selection:cleared': () => setSelectedObject(null),
        });

        // Sync State on Manual Transformations (Move, Scale, Rotate)
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

        // Style new objects with premium handles
        const styleObject = (obj) => {
            obj.set({
                cornerColor: '#c5a059',
                cornerStyle: 'circle',
                cornerSize: 10,
                transparentCorners: false,
                borderColor: '#c5a059',
                borderDashArray: [3, 3]
            });
        };
        canvas.on('object:added', (e) => styleObject(e.target));

        // Add Default Welcome Text
        const welcomeText = new IText('Creloy Designer', {
            left: 200,
            top: 200,
            fontFamily: 'Outfit',
            fontSize: 40,
            fill: '#c5a059'
        });
        canvas.add(welcomeText);
        canvas.setActiveObject(welcomeText);

        // Load Asset from State if exists
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

        // Keyboard Shortcut: Delete/Backspace
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
    }, [showError]);

    // -------------------------------------------------------------------------
    // Tool Operations (Add Objects)
    // -------------------------------------------------------------------------

    const addRectAt = useCallback((x, y) => {
        const rect = new Rect({ left: x - 50, top: y - 50, fill: '#c5a059', width: 100, height: 100, rx: 8, ry: 8 });
        fabricCanvas.current.add(rect);
        fabricCanvas.current.setActiveObject(rect);
    }, []);

    const addCircleAt = useCallback((x, y) => {
        const circle = new Circle({ left: x - 50, top: y - 50, fill: '#c5a059', radius: 50 });
        fabricCanvas.current.add(circle);
        fabricCanvas.current.setActiveObject(circle);
    }, []);

    const addTriangleAt = useCallback((x, y) => {
        const triangle = new Triangle({ left: x - 50, top: y - 50, fill: '#c5a059', width: 100, height: 100 });
        fabricCanvas.current.add(triangle);
        fabricCanvas.current.setActiveObject(triangle);
    }, []);

    const addEllipseAt = useCallback((x, y) => {
        const ellipse = new Ellipse({ left: x - 50, top: y - 30, fill: '#c5a059', rx: 50, ry: 30 });
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
        const star = new Polygon(points, { left: x - 50, top: y - 50, fill: '#c5a059' });
        fabricCanvas.current.add(star);
        fabricCanvas.current.setActiveObject(star);
    }, []);

    const addHexagonAt = useCallback((x, y) => {
        const points = [];
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            points.push({ x: 50 * Math.sin(angle), y: -50 * Math.cos(angle) });
        }
        const hexagon = new Polygon(points, { left: x - 50, top: y - 50, fill: '#c5a059' });
        fabricCanvas.current.add(hexagon);
        fabricCanvas.current.setActiveObject(hexagon);
    }, []);

    const addDiamondAt = useCallback((x, y) => {
        const diamond = new Rect({ left: x, top: y - 50, fill: '#c5a059', width: 70, height: 70, angle: 45 });
        fabricCanvas.current.add(diamond);
        fabricCanvas.current.setActiveObject(diamond);
    }, []);

    const addLineAt = useCallback((x, y) => {
        const line = new Line([x - 50, y, x + 50, y], { stroke: '#c5a059', strokeWidth: 4, left: x - 50, top: y - 2 });
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
            fill: '#333333'
        });
        fabricCanvas.current.add(text);
        fabricCanvas.current.setActiveObject(text);
    }, []);

    // Quick Adders
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

    // Image Upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            showError("Invalid file type. Please upload an image.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            showError("File too large. Max size is 5MB.");
            return;
        }

        const reader = new FileReader();
        reader.onerror = () => showError("Failed to read file.");
        reader.onload = (f) => {
            const imgElement = new Image();
            imgElement.onerror = () => showError("Failed to load image element.");
            imgElement.src = f.target.result;
            imgElement.onload = () => {
                try {
                    const fabricImg = new FabricImage(imgElement, { left: 50, top: 50, scaleX: 0.5, scaleY: 0.5 });
                    fabricCanvas.current.add(fabricImg);
                    fabricCanvas.current.setActiveObject(fabricImg);
                    fabricCanvas.current.renderAll();
                } catch (err) {
                    showError("Failed to add image to canvas.");
                }
            };
        };
        reader.readAsDataURL(file);
    };

    // -------------------------------------------------------------------------
    // Object Property Modifiers
    // -------------------------------------------------------------------------

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

    const updateRotation = (angle) => {
        if (!selectedObject) return;
        selectedObject.set('angle', parseFloat(angle));
        fabricCanvas.current.renderAll();
        setSelectedObject({ ...selectedObject, angle: parseFloat(angle) });
    };

    const bringToFront = () => { if (selectedObject) { selectedObject.bringToFront(); fabricCanvas.current.renderAll(); } };
    const sendToBack = () => { if (selectedObject) { selectedObject.sendToBack(); fabricCanvas.current.renderAll(); } };
    const bringForward = () => { if (selectedObject) { selectedObject.bringForward(); fabricCanvas.current.renderAll(); } };
    const sendBackward = () => { if (selectedObject) { selectedObject.sendBackwards(); fabricCanvas.current.renderAll(); } };
    const deleteSelected = () => {
        const active = fabricCanvas.current.getActiveObjects();
        fabricCanvas.current.remove(...active);
        fabricCanvas.current.discardActiveObject();
    };

    // -------------------------------------------------------------------------
    // Canvas View Controls
    // -------------------------------------------------------------------------

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

    // -------------------------------------------------------------------------
    // Drag & Drop Handlers
    // -------------------------------------------------------------------------

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
        <div className="h-screen w-full flex flex-col overflow-hidden bg-[#0f0f0f] text-white select-none">
            {/* Error Alert Overlay */}
            {errorMessage && (
                <div className="fixed top-20 right-6 bg-red-500 text-white px-6 py-3 rounded-lg shadow-2xl z-[9999] animate-bounce flex items-center gap-3 border border-red-400">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="text-sm font-bold">{errorMessage}</span>
                </div>
            )}

            {/* --- Premium Header --- */}
            <header className="h-[56px] bg-[#1a1a1a] border-b border-white/10 flex items-center justify-between px-6 z-50">
                <div className="flex items-center gap-8">
                    <button onClick={() => window.location.href = '/'} className="flex items-center gap-2 text-[#c5a059] font-bold text-lg hover:opacity-80 transition-opacity">
                        ← <span>Creloy</span>
                    </button>
                    <div className="flex flex-col justify-center">
                        <span className="text-sm font-semibold text-white/90">Untitled Design</span>
                        <span className="text-[10px] text-white/40">All changes saved</span>
                    </div>
                </div>

                <div className="flex items-center bg-white/5 rounded-lg p-1">
                    <button onClick={() => updateZoom(zoom - 0.1)} className="p-1.5 hover:bg-white/10 rounded-md text-white/60"><ZoomOut size={16} /></button>
                    <span className="w-14 text-center text-xs font-mono font-medium">{Math.round(zoom * 100)}%</span>
                    <button onClick={() => updateZoom(zoom + 0.1)} className="p-1.5 hover:bg-white/10 rounded-md text-white/60"><ZoomIn size={16} /></button>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex gap-1 mr-4">
                        <button className="p-2 hover:bg-white/5 rounded text-white/40"><Undo size={18} /></button>
                        <button className="p-2 hover:bg-white/5 rounded text-white/40"><Redo size={18} /></button>
                    </div>
                    <div className="relative group">
                        <button className="flex items-center gap-2 bg-[#c5a059] hover:bg-[#d4b06a] text-[#1a1a1a] px-4 py-2 rounded-md font-bold text-sm transition-all shadow-lg shadow-[#c5a059]/10">
                            <Download size={18} /> Download ▾
                        </button>
                        <div className="absolute right-0 top-full mt-2 w-48 bg-[#222] border border-white/10 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-1 z-[100]">
                            <button onClick={() => exportImage('png')} className="w-full text-left px-4 py-2.5 hover:bg-white/5 rounded text-sm text-white/80 transition-colors">Download PNG</button>
                            <button onClick={() => exportImage('jpeg')} className="w-full text-left px-4 py-2.5 hover:bg-white/5 rounded text-sm text-white/80 transition-colors">Download JPEG</button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 min-h-0 relative">
                {/* --- Dark Sidebar --- */}
                <aside className="w-[72px] bg-[#1a1a1a] border-r border-white/10 flex flex-col items-center py-4 gap-4 z-40">
                    <SidebarBtn icon={<Layers size={20} />} label="Layouts" active={activePanel === 'templates'} onClick={() => setActivePanel('templates')} />
                    <SidebarBtn icon={<Square size={20} />} label="Elements" active={activePanel === 'elements'} onClick={() => setActivePanel('elements')} />
                    <SidebarBtn icon={<Type size={20} />} label="Text" active={activePanel === 'text'} onClick={() => setActivePanel('text')} />
                    <SidebarBtn icon={<ImageIcon size={20} />} label="Uploads" active={activePanel === 'uploads'} onClick={() => setActivePanel('uploads')} />
                </aside>

                {/* --- Side Expansion Panel --- */}
                <div className="w-[300px] bg-[#1a1a1a] border-r border-white/10 flex flex-col z-30 shadow-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-white/10">
                        <h3 className="text-base font-bold text-white/90 capitalize">{activePanel}</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
                        {activePanel === 'elements' && (
                            <div className="grid grid-cols-2 gap-3">
                                <ShapeItem icon={<Square size={32} />} type="rect" onDragStart={handleDragStart} onClick={addRect} />
                                <ShapeItem icon={<CircleIcon size={32} />} type="circle" onDragStart={handleDragStart} onClick={addCircle} />
                                <ShapeItem icon={<TriangleIcon size={32} />} type="triangle" onDragStart={handleDragStart} onClick={addTriangle} />
                                <ShapeItem icon={<div className="w-10 h-6 border-2 border-current rounded-[50%]" />} type="ellipse" onDragStart={handleDragStart} onClick={addEllipse} />
                                <ShapeItem icon={<StarIcon size={32} />} type="star" onDragStart={handleDragStart} onClick={addStar} />
                                <ShapeItem icon={<HexagonIcon size={32} />} type="hexagon" onDragStart={handleDragStart} onClick={addHexagon} />
                                <ShapeItem icon={<DiamondIcon size={32} />} type="diamond" onDragStart={handleDragStart} onClick={addDiamond} />
                                <ShapeItem icon={<Minus size={32} />} type="line" onDragStart={handleDragStart} onClick={addLine} />
                            </div>
                        )}
                        {activePanel === 'text' && (
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 px-1">Typographic Presets</label>
                                    <div className="space-y-2">
                                        <button
                                            className="w-full group bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 rounded-xl transition-all p-4 text-left shadow-lg"
                                            onClick={() => addText('heading')}
                                        >
                                            <div className="text-2xl font-bold text-white group-hover:text-[#c5a059] transition-colors mb-1">Add a heading</div>
                                            <div className="text-[10px] text-white/20 uppercase tracking-widest font-medium">Extra Large • Bold</div>
                                        </button>

                                        <button
                                            className="w-full group bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 rounded-xl transition-all p-3.5 text-left"
                                            onClick={() => addText('subheading')}
                                        >
                                            <div className="text-lg font-semibold text-white/90 group-hover:text-[#c5a059] transition-colors mb-1">Add a subheading</div>
                                            <div className="text-[10px] text-white/20 uppercase tracking-widest font-medium">Large • Semi-Bold</div>
                                        </button>

                                        <button
                                            className="w-full group bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 rounded-xl transition-all p-3 text-left"
                                            onClick={() => addText('body')}
                                        >
                                            <div className="text-sm text-white/70 group-hover:text-[#c5a059] transition-colors mb-1">Add body text</div>
                                            <div className="text-[10px] text-white/20 uppercase tracking-widest font-medium">Normal • Regular</div>
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/5">
                                    <button className="w-full bg-[#c5a059] hover:bg-[#d4b06a] text-[#1a1a1a] font-bold py-4 rounded-xl shadow-xl shadow-[#c5a059]/5 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                                        draggable="true" onDragStart={(e) => handleDragStart(e, 'text')} onClick={() => addText('body')}>
                                        <div className="bg-[#1a1a1a]/10 p-1.5 rounded-lg"><Type size={18} /></div>
                                        <span>Add Default Text</span>
                                    </button>
                                    <p className="text-[9px] text-white/20 text-center uppercase tracking-[0.15em] mt-3 font-medium">Drag to canvas or click to place</p>
                                </div>
                            </div>
                        )}
                        {activePanel === 'uploads' && (
                            <label className="w-full h-32 border-2 border-dashed border-white/10 hover:border-[#c5a059]/50 hover:bg-white/[0.02] rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all">
                                <ImageIcon className="text-white/20" size={32} />
                                <span className="text-xs text-white/50 font-medium">Upload Image</span>
                                <input type="file" hidden onChange={handleImageUpload} accept="image/*" />
                            </label>
                        )}
                        {activePanel === 'templates' && (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8">
                                <div className="w-12 h-12 bg-[#c5a059]/10 rounded-full flex items-center justify-center mb-4">
                                    <StarIcon size={24} className="text-[#c5a059]" />
                                </div>
                                <h4 className="text-sm font-bold mb-2">Premium Templates</h4>
                                <p className="text-xs text-white/40 leading-relaxed">Unlock exclusive templates to jumpstart your creativity.</p>
                            </div>
                        )}
                    </div>
                </div>

                <main className="flex-1 flex flex-col bg-[#f0f2f5] relative overflow-hidden" ref={containerRef} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                    {/* Workspace Top Bar */}
                    <div className="h-[48px] bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm z-20">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mr-2">Workspace</span>
                            <div className="h-4 w-[1px] bg-gray-200 mr-2" />
                            <ToolbarBtn icon={<Undo size={16} />} />
                            <ToolbarBtn icon={<Redo size={16} />} />
                        </div>
                        {selectedObject && <div className="text-[11px] font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full capitalize">{selectedObject.type} selected</div>}
                    </div>

                    {/* Context Property Bar */}
                    {selectedObject && (
                        <div className="absolute top-[64px] left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#1a1a1a] p-1.5 rounded-xl shadow-2xl border border-white/5 z-[100] transition-all">
                            <div className="flex items-center gap-2 px-3 border-r border-white/10 mr-1">
                                <div className="relative w-6 h-6 rounded-md overflow-hidden border border-white/10 cursor-pointer">
                                    <input type="color" className="absolute -inset-2 w-[200%] h-[200%] cursor-pointer"
                                        value={selectedObject instanceof Line ? (selectedObject.stroke || '#c5a059') : (selectedObject.fill || '#c5a059')}
                                        onChange={(e) => updateColor(e.target.value)} />
                                </div>
                                <span className="text-[10px] font-bold uppercase text-white/40">Color</span>
                            </div>

                            {selectedObject instanceof IText && (
                                <>
                                    <select className="bg-white/5 border-none text-xs text-white/80 rounded-md px-2 py-1.5 focus:ring-0 outline-none cursor-pointer"
                                        value={selectedObject.fontFamily} onChange={(e) => updateFontFamily(e.target.value)}>
                                        <option value="Outfit">Outfit</option>
                                        <option value="Inter">Inter</option>
                                        <option value="Playfair Display">Playfair</option>
                                        <option value="serif">Serif</option>
                                    </select>
                                    <input type="number" className="w-14 bg-white/5 border-none text-xs text-center text-white/80 rounded-md py-1.5 outline-none"
                                        value={Math.round(selectedObject.fontSize)} onChange={(e) => updateFontSize(e.target.value)} />
                                    <div className="w-[1px] h-4 bg-white/10" />
                                    <PropertyBtn icon={<Bold size={14} />} active={selectedObject.fontWeight === 'bold'} onClick={toggleFontWeight} />
                                    <PropertyBtn icon={<Italic size={14} />} active={selectedObject.fontStyle === 'italic'} onClick={() => toggleFontStyle('italic')} />
                                    <PropertyBtn icon={<AlignLeft size={14} />} active={selectedObject.textAlign === 'left'} onClick={() => updateTextAlignment('left')} />
                                    <PropertyBtn icon={<AlignRight size={14} />} active={selectedObject.textAlign === 'right'} onClick={() => updateTextAlignment('right')} />
                                </>
                            )}

                            <div className="flex items-center gap-2 px-3 border-x border-white/10 mx-1">
                                <input type="range" min="0" max="100" className="w-16 accent-[#c5a059] h-1"
                                    value={Math.round(selectedObject.opacity * 100)} onChange={(e) => updateOpacity(e.target.value)} />
                                <span className="text-[10px] font-mono text-white/60 w-8">{Math.round(selectedObject.opacity * 100)}%</span>
                            </div>

                            <div className="flex items-center gap-1.5 px-2">
                                <input type="number" className="w-12 bg-white/5 border-none text-[11px] text-center text-white/80 rounded-md py-1.5 outline-none"
                                    value={Math.round(selectedObject.angle)} onChange={(e) => updateRotation(e.target.value)} />
                                <span className="text-[10px] text-white/40">°</span>
                            </div>

                            <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 mx-1">
                                <PropertyBtn icon={<Layers size={14} className="rotate-180" />} onClick={sendToBack} title="Send to Back" />
                                <PropertyBtn icon={<Layers size={12} className="rotate-180 opacity-60" />} onClick={sendBackward} title="Send Backward" />
                                <div className="w-[1px] h-3 bg-white/10 mx-0.5" />
                                <PropertyBtn icon={<Layers size={12} className="opacity-60" />} onClick={bringForward} title="Bring Forward" />
                                <PropertyBtn icon={<Layers size={14} />} onClick={bringToFront} title="Bring to Front" />
                            </div>
                            <button onClick={deleteSelected} className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"><Trash2 size={16} /></button>
                        </div>
                    )}

                    <div className="flex-1 flex items-center justify-center p-12 overflow-auto custom-scrollbar">
                        <div className="bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)]">
                            <canvas ref={canvasRef} />
                        </div>
                    </div>
                </main>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
            `}</style>
        </div>
    );
};

// Sub-components
const SidebarBtn = ({ icon, label, active, onClick }) => (
    <button onClick={onClick} className={`w-14 h-14 flex flex-col items-center justify-center gap-1.5 rounded-xl transition-all ${active ? 'bg-[#c5a059]/10 text-[#c5a059]' : 'text-white/40 hover:bg-white/5 hover:text-white/70'}`}>
        {icon}
        <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
    </button>
);
const ShapeItem = ({ icon, type, onDragStart, onClick }) => (
    <div draggable="true" onDragStart={(e) => onDragStart(e, type)} onClick={onClick}
        className="aspect-square bg-white/[0.03] border border-white/5 rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/5 hover:border-[#c5a059]/30 transition-all text-white/40 hover:text-white">
        {icon}
    </div>
);
const ToolbarBtn = ({ icon, onClick }) => (
    <button onClick={onClick} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-all">{icon}</button>
);
const PropertyBtn = ({ icon, active, onClick, title }) => (
    <button onClick={onClick} title={title} className={`p-2 rounded-lg transition-all ${active ? 'bg-[#c5a059] text-[#1a1a1a]' : 'text-white/40 hover:bg-white/10 hover:text-white/80'}`}>
        {icon}
    </button>
);

export default Editor;
