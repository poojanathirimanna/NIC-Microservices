import React from 'react';

const ProcessingSummary = ({ styles, responseInfo, isMobile, isTablet }) => {
  if (!responseInfo) return null;

  return (
    <div style={{
      ...styles.summarySection,
      padding: isMobile ? '20px' : '32px'
    }}>
      <div style={{
        ...styles.summaryHeader,
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: isMobile ? '8px' : '12px',
        marginBottom: isMobile ? '16px' : '24px'
      }}>
        <span style={{
          ...styles.summaryIcon,
          fontSize: isMobile ? '20px' : '24px'
        }}>📊</span>
        <h3 style={{
          ...styles.summaryTitle,
          fontSize: isMobile ? '20px' : '24px'
        }}>Processing Summary</h3>
      </div>
      <div style={{
        ...styles.summaryGrid,
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: isMobile ? '12px' : '16px',
        marginBottom: isMobile ? '16px' : '24px'
      }}>
        <div style={{
          ...styles.summaryCard,
          padding: isMobile ? '16px' : '24px'
        }}>
          <span style={{
            ...styles.summaryCardIcon,
            fontSize: isMobile ? '24px' : '32px'
          }}>📁</span>
          <span style={{
            ...styles.summaryCardLabel,
            fontSize: isMobile ? '12px' : '14px'
          }}>Files Processed</span>
          <span style={{
            ...styles.summaryCardValue,
            fontSize: isMobile ? '20px' : '28px'
          }}>{responseInfo.filesProcessed}</span>
        </div>
        <div style={{
          ...styles.summaryCard,
          padding: isMobile ? '16px' : '24px'
        }}>
          <span style={{
            ...styles.summaryCardIcon,
            fontSize: isMobile ? '24px' : '32px'
          }}>✅</span>
          <span style={{
            ...styles.summaryCardLabel,
            fontSize: isMobile ? '12px' : '14px'
          }}>Records Inserted</span>
          <span style={{
            ...styles.summaryCardValue,
            fontSize: isMobile ? '20px' : '28px'
          }}>{responseInfo.inserted}</span>
        </div>
        <div style={{
          ...styles.summaryCard,
          padding: isMobile ? '16px' : '24px'
        }}>
          <span style={{
            ...styles.summaryCardIcon,
            fontSize: isMobile ? '24px' : '32px'
          }}>⏭️</span>
          <span style={{
            ...styles.summaryCardLabel,
            fontSize: isMobile ? '12px' : '14px'
          }}>Records Skipped</span>
          <span style={{
            ...styles.summaryCardValue,
            fontSize: isMobile ? '20px' : '28px'
          }}>{responseInfo.skipped}</span>
        </div>
      </div>
      <div style={{
        ...styles.successMessage,
        padding: isMobile ? '12px 16px' : '16px 20px'
      }}>
        <span style={{
          ...styles.successIcon,
          fontSize: isMobile ? '16px' : '20px'
        }}>🎉</span>
        <span style={{
          ...styles.successText,
          fontSize: isMobile ? '14px' : '16px'
        }}>{responseInfo.message}</span>
      </div>
      {responseInfo.skippedNICs?.length > 0 && (
        <div style={{
          ...styles.skippedSection,
          padding: isMobile ? '12px 16px' : '16px 20px'
        }}>
          <h4 style={{
            ...styles.skippedTitle,
            fontSize: isMobile ? '14px' : '16px'
          }}>⚠️ Skipped NICs:</h4>
          <div style={{
            ...styles.skippedList,
            gap: isMobile ? '6px' : '8px'
          }}>
            {responseInfo.skippedNICs.map((nic, idx) => (
              <span key={idx} style={{
                ...styles.skippedItem,
                fontSize: isMobile ? '10px' : '12px',
                padding: isMobile ? '2px 6px' : '4px 8px'
              }}>{nic}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessingSummary;
