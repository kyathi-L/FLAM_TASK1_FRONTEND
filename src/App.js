import React, { useState, useRef, useEffect, useCallback } from 'react';

// Add CSS styles
const styles = `
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .app {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .header-icon {
    display: inline-block;
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 2rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  }

  .title {
    font-size: 3rem;
    font-weight: bold;
    color: white;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  .subtitle {
    font-size: 1.2rem;
    color: rgba(255,255,255,0.9);
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .controls {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    text-decoration: none;
    font-size: 1rem;
  }

  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  }

  .btn:active {
    transform: translateY(0);
  }

  .btn-blue {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .btn-purple {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    color: white;
  }

  .btn-gray {
    background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
    color: white;
  }

  .status {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255,255,255,0.9);
    border-radius: 50px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    font-weight: 600;
    color: #333;
  }

  .status-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .status-dot.active {
    background: #28a745;
    animation: pulse 2s infinite;
  }

  .status-dot.inactive {
    background: #dc3545;
  }

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(40, 167, 69, 0); }
    100% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0); }
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .feature-card {
    background: rgba(255,255,255,0.9);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.15);
  }

  .feature-icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .feature-title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 0.5rem;
  }

  .feature-desc {
    color: #666;
    line-height: 1.6;
  }

  .instructions {
    background: rgba(255,255,255,0.9);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    backdrop-filter: blur(10px);
  }

  .instructions-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 2rem;
  }

  .instructions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .instruction-section h4 {
    font-weight: bold;
    color: #333;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .instruction-number {
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .instruction-list {
    list-style: none;
    padding: 0;
    margin-left: 2rem;
  }

  .instruction-list li {
    margin-bottom: 0.5rem;
    color: #666;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .instruction-bullet {
    width: 6px;
    height: 6px;
    background: #667eea;
    border-radius: 50%;
  }

  /* Bottom Sheet Styles */
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.4);
    z-index: 40;
    transition: opacity 0.3s ease;
  }

  .bottom-sheet {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    border-radius: 1.5rem 1.5rem 0 0;
    box-shadow: 0 -10px 50px rgba(0,0,0,0.3);
    z-index: 50;
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .bottom-sheet.closed {
    transform: translateY(100%);
  }

  .sheet-handle-area {
    display: flex;
    justify-content: center;
    padding: 1rem 0;
    cursor: grab;
    user-select: none;
  }

  .sheet-handle-area:active {
    cursor: grabbing;
  }

  .sheet-handle {
    width: 3rem;
    height: 0.25rem;
    background: #ccc;
    border-radius: 0.125rem;
    transition: background 0.2s ease;
  }

  .sheet-handle-area:hover .sheet-handle {
    background: #999;
  }

  .sheet-content {
    flex: 1;
    overflow-y: auto;
    padding: 0 1.5rem 1.5rem;
  }

  .content-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .content-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 0.5rem;
  }

  .content-subtitle {
    color: #666;
  }

  .content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .content-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 1rem;
    padding: 1.5rem;
    transition: transform 0.2s ease;
  }

  .content-card:hover {
    transform: scale(1.02);
  }

  .content-card h3 {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .content-card p {
    font-size: 0.9rem;
    opacity: 0.9;
    line-height: 1.4;
  }

  .sample-list {
    margin-bottom: 2rem;
  }

  .sample-list h3 {
    font-size: 1.1rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 1rem;
  }

  .list-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 0.5rem;
    margin-bottom: 0.75rem;
    transition: background 0.2s ease;
  }

  .list-item:hover {
    background: #e9ecef;
  }

  .list-avatar {
    width: 3rem;
    height: 3rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }

  .list-content {
    flex: 1;
  }

  .list-title {
    font-weight: 600;
    color: #333;
    margin-bottom: 0.25rem;
  }

  .list-desc {
    font-size: 0.9rem;
    color: #666;
  }

  .tips-section {
    background: linear-gradient(135deg, #ffe4e1 0%, #f8d7da 100%);
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .tips-title {
    font-size: 1.1rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 1rem;
  }

  .tips-list {
    list-style: none;
    padding: 0;
  }

  .tips-list li {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    color: #333;
    font-size: 0.9rem;
  }

  .tip-bullet {
    color: #ff6b6b;
    font-weight: bold;
    margin-top: 0.1rem;
  }

  .content-footer {
    text-align: center;
    padding-top: 1rem;
    border-top: 1px solid #eee;
    color: #999;
    font-size: 0.9rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .title {
      font-size: 2rem;
    }
    
    .subtitle {
      font-size: 1rem;
    }
    
    .container {
      padding: 1rem;
    }
    
    .controls {
      flex-direction: column;
      align-items: center;
    }
    
    .btn {
      width: 100%;
      max-width: 200px;
      justify-content: center;
    }
  }
`;

// Constants moved outside component to avoid ESLint warnings
const SNAP_POINTS = {
  CLOSED: 0,
  HALF_OPEN: 1,
  FULLY_OPEN: 2
};

// Custom hook for spring animation
const useSpringAnimation = (targetValue, config = {}) => {
  const [currentValue, setCurrentValue] = useState(targetValue);
  const animationRef = useRef();
  
  const { tension = 300, friction = 30, precision = 0.01 } = config;
  
  useEffect(() => {
    if (Math.abs(currentValue - targetValue) < precision) {
      setCurrentValue(targetValue);
      return;
    }
    
    let velocity = 0;
    let position = currentValue;
    
    const animate = () => {
      const spring = -tension * (position - targetValue);
      const damper = -friction * velocity;
      const acceleration = spring + damper;
      
      velocity += acceleration * 0.016;
      position += velocity * 0.016;
      
      setCurrentValue(position);
      
      if (Math.abs(velocity) > precision || Math.abs(position - targetValue) > precision) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentValue(targetValue);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, tension, friction, precision, currentValue]);
  
  return currentValue;
};

// Bottom Sheet Component
const BottomSheet = ({ children, isOpen, snapPoint, onSnapPointChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragStartSnapPoint, setDragStartSnapPoint] = useState(0);
  const sheetRef = useRef(null);
  
  const getSnapPointHeight = (point) => {
    switch (point) {
      case SNAP_POINTS.CLOSED:
        return 12; // Only handle visible
      case SNAP_POINTS.HALF_OPEN:
        return 50; // Half screen
      case SNAP_POINTS.FULLY_OPEN:
        return 85; // Almost full screen
      default:
        return 12;
    }
  };
  
  const targetHeight = isOpen ? getSnapPointHeight(snapPoint) : 0;
  const animatedHeight = useSpringAnimation(targetHeight, {
    tension: 280,
    friction: 28
  });
  
  const handleTouchStart = useCallback((e) => {
    setIsDragging(true);
    setDragStartY(e.touches[0].clientY);
    setDragStartSnapPoint(snapPoint);
  }, [snapPoint]);
  
  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setDragStartY(e.clientY);
    setDragStartSnapPoint(snapPoint);
  }, [snapPoint]);
  
  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = dragStartY - currentY;
    const windowHeight = window.innerHeight;
    const deltaPercent = (deltaY / windowHeight) * 100;
    
    let newSnapPoint = dragStartSnapPoint;
    
    if (deltaPercent > 10) {
      // Dragging up
      if (dragStartSnapPoint === SNAP_POINTS.CLOSED) {
        newSnapPoint = SNAP_POINTS.HALF_OPEN;
      } else if (dragStartSnapPoint === SNAP_POINTS.HALF_OPEN) {
        newSnapPoint = SNAP_POINTS.FULLY_OPEN;
      }
    } else if (deltaPercent < -10) {
      // Dragging down
      if (dragStartSnapPoint === SNAP_POINTS.FULLY_OPEN) {
        newSnapPoint = SNAP_POINTS.HALF_OPEN;
      } else if (dragStartSnapPoint === SNAP_POINTS.HALF_OPEN) {
        newSnapPoint = SNAP_POINTS.CLOSED;
      }
    }
    
    if (newSnapPoint !== snapPoint) {
      onSnapPointChange(newSnapPoint);
    }
  }, [isDragging, dragStartY, dragStartSnapPoint, snapPoint, onSnapPointChange]);
  
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const currentY = e.clientY;
    const deltaY = dragStartY - currentY;
    const windowHeight = window.innerHeight;
    const deltaPercent = (deltaY / windowHeight) * 100;
    
    let newSnapPoint = dragStartSnapPoint;
    
    if (deltaPercent > 10) {
      if (dragStartSnapPoint === SNAP_POINTS.CLOSED) {
        newSnapPoint = SNAP_POINTS.HALF_OPEN;
      } else if (dragStartSnapPoint === SNAP_POINTS.HALF_OPEN) {
        newSnapPoint = SNAP_POINTS.FULLY_OPEN;
      }
    } else if (deltaPercent < -10) {
      if (dragStartSnapPoint === SNAP_POINTS.FULLY_OPEN) {
        newSnapPoint = SNAP_POINTS.HALF_OPEN;
      } else if (dragStartSnapPoint === SNAP_POINTS.HALF_OPEN) {
        newSnapPoint = SNAP_POINTS.CLOSED;
      }
    }
    
    if (newSnapPoint !== snapPoint) {
      onSnapPointChange(newSnapPoint);
    }
  }, [isDragging, dragStartY, dragStartSnapPoint, snapPoint, onSnapPointChange]);
  
  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleEnd);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      
      return () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleEnd);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleEnd);
      };
    }
  }, [isDragging, handleTouchMove, handleMouseMove, handleEnd]);
  
  return (
    <>
      {/* Backdrop */}
      {isOpen && snapPoint > SNAP_POINTS.CLOSED && (
        <div 
          className="backdrop"
          onClick={() => onSnapPointChange(SNAP_POINTS.CLOSED)}
        />
      )}
      
      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className={`bottom-sheet ${!isOpen ? 'closed' : ''}`}
        style={{
          height: `${animatedHeight}vh`,
        }}
      >
        {/* Handle */}
        <div
          className="sheet-handle-area"
          onTouchStart={handleTouchStart}
          onMouseDown={handleMouseDown}
        >
          <div className="sheet-handle" />
        </div>
        
        {/* Content */}
        <div className="sheet-content">
          {children}
        </div>
      </div>
    </>
  );
};

// Sample content component
const BottomSheetContent = () => {
  return (
    <>
      <div className="content-header">
        <h2 className="content-title">Interactive Bottom Sheet</h2>
        <p className="content-subtitle">
          Drag the handle or use buttons to control the sheet
        </p>
      </div>
      
      <div className="content-grid">
        <div className="content-card">
          <h3>Spring Physics</h3>
          <p>Smooth spring animations powered by custom physics engine</p>
        </div>
        <div className="content-card">
          <h3>Gesture Control</h3>
          <p>Multiple snap points with intuitive gesture recognition</p>
        </div>
      </div>
      
      <div className="sample-list">
        <h3>Sample Content</h3>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="list-item">
            <div className="list-avatar">{item}</div>
            <div className="list-content">
              <div className="list-title">List Item {item}</div>
              <div className="list-desc">
                This is sample content to demonstrate scrolling behavior
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="tips-section">
        <h3 className="tips-title">Pro Tips</h3>
        <ul className="tips-list">
          <li>
            <span className="tip-bullet">•</span>
            <span>Drag the handle smoothly for best experience</span>
          </li>
          <li>
            <span className="tip-bullet">•</span>
            <span>Try quick flicks to snap between positions</span>
          </li>
          <li>
            <span className="tip-bullet">•</span>
            <span>Works perfectly on both mobile and desktop</span>
          </li>
        </ul>
      </div>
      
      <div className="content-footer">
        🎉 Try dragging the handle up and down, or use the buttons above!
      </div>
    </>
  );
};

// Main App Component
const App = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [snapPoint, setSnapPoint] = useState(0);
  
  // Add styles to head
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  const handleOpenSheet = (point) => {
    setSnapPoint(point);
    setIsSheetOpen(true);
  };
  
  const handleSnapPointChange = (newSnapPoint) => {
    setSnapPoint(newSnapPoint);
    if (newSnapPoint === SNAP_POINTS.CLOSED) {
      setIsSheetOpen(false);
    } else if (!isSheetOpen) {
      setIsSheetOpen(true);
    }
  };
  
  const getSnapPointLabel = (point) => {
    switch (point) {
      case SNAP_POINTS.CLOSED:
        return 'Closed';
      case SNAP_POINTS.HALF_OPEN:
        return 'Half Open';
      case SNAP_POINTS.FULLY_OPEN:
        return 'Fully Open';
      default:
        return 'Unknown';
    }
  };
  
  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <div className="header-icon">📱</div>
          <h1 className="title">React Bottom Sheet</h1>
          <p className="subtitle">
            A custom implementation with spring animations, multiple snap points, and gesture controls
          </p>
          
          <div className="controls">
            <button
              onClick={() => handleOpenSheet(SNAP_POINTS.HALF_OPEN)}
              className="btn btn-blue"
            >
              <span>↗</span>
              <span>Open Half</span>
            </button>
            <button
              onClick={() => handleOpenSheet(SNAP_POINTS.FULLY_OPEN)}
              className="btn btn-purple"
            >
              <span>⬆</span>
              <span>Open Full</span>
            </button>
            <button
              onClick={() => handleSnapPointChange(SNAP_POINTS.CLOSED)}
              className="btn btn-gray"
            >
              <span>⬇</span>
              <span>Close Sheet</span>
            </button>
          </div>
          
          <div className="status">
            <div className={`status-dot ${isSheetOpen ? 'active' : 'inactive'}`} />
            <span>Status: <strong>{getSnapPointLabel(snapPoint)}</strong></span>
          </div>
        </div>
        
        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3 className="feature-title">Multiple Snap Points</h3>
            <p className="feature-desc">
              Three distinct positions: closed, half-open, and fully open with smooth transitions
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Spring Physics</h3>
            <p className="feature-desc">
              Custom spring animation system with realistic motion and momentum
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">👆</div>
            <h3 className="feature-title">Touch & Mouse</h3>
            <p className="feature-desc">
              Drag gestures work seamlessly on both desktop and mobile devices
            </p>
          </div>
        </div>
        
        <div className="instructions">
          <h3 className="instructions-title">How to Use</h3>
          <div className="instructions-grid">
            <div className="instruction-section">
              <h4>
                <span className="instruction-number">1</span>
                Gesture Controls
              </h4>
              <ul className="instruction-list">
                <li>
                  <span className="instruction-bullet"></span>
                  <span>Drag the handle up/down to change positions</span>
                </li>
                <li>
                  <span className="instruction-bullet"></span>
                  <span>Tap the backdrop to close the sheet</span>
                </li>
                <li>
                  <span className="instruction-bullet"></span>
                  <span>Works with both touch and mouse</span>
                </li>
              </ul>
            </div>
            
            <div className="instruction-section">
              <h4>
                <span className="instruction-number">2</span>
                Button Controls
              </h4>
              <ul className="instruction-list">
                <li>
                  <span className="instruction-bullet"></span>
                  <span>Use control buttons for precise positioning</span>
                </li>
                <li>
                  <span className="instruction-bullet"></span>
                  <span>Status indicator shows current state</span>
                </li>
                <li>
                  <span className="instruction-bullet"></span>
                  <span>Responsive design adapts to screen size</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <BottomSheet
        isOpen={isSheetOpen}
        snapPoint={snapPoint}
        onSnapPointChange={handleSnapPointChange}
      >
        <BottomSheetContent />
      </BottomSheet>
    </div>
  );
};

export default App;