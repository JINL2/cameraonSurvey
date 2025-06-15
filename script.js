// Supabase 초기화
const SUPABASE_URL = 'https://yenfccoefczqxckbizqa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllbmZjY29lZmN6cXhja2JpenFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NDkyNzksImV4cCI6MjA2MTUyNTI3OX0.U1iQUOaNPSrEHf1w_ePqgYzJiRO6Bi48E2Np2hY0nCQ';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 폼 요소들
const form = document.getElementById('feedbackForm');
const photoUpload = document.getElementById('photoUpload');
const photoPreview = document.getElementById('photoPreview');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const complaintSelect = document.getElementById('complaintSelect');
const otherComplaintSection = document.getElementById('otherComplaintSection');
const otherComplaint = document.getElementById('otherComplaint');
const positiveOtherSection = document.getElementById('positiveOtherSection');
const positiveOther = document.getElementById('positiveOther');

// 업로드된 사진 파일
let uploadedPhotoFile = null;

// 데이터 로드
let positiveAspectsData = [];
let complaintListData = [];

// 초기화 시 데이터 로드
async function loadInitialData() {
    try {
        // 좋았던 점 목록 로드
        const { data: positiveData, error: positiveError } = await supabaseClient
            .from('positive_aspects')
            .select('*')
            .eq('is_active', true)
            .order('created_at');
        
        if (positiveError) throw positiveError;
        positiveAspectsData = positiveData;
        
        // 개선사항 목록 로드
        const { data: complaintData, error: complaintError } = await supabaseClient
            .from('complaint_list')
            .select('*')
            .eq('is_active', true)
            .order('created_at');
        
        if (complaintError) throw complaintError;
        complaintListData = complaintData;
        
        // UI 업데이트
        updatePositiveAspectsUI();
        updateComplaintListUI();
        
    } catch (error) {
        console.error('Lỗi tải dữ liệu:', error);
    }
}

// 좋았던 점 UI 업데이트
function updatePositiveAspectsUI() {
    const checkboxGroup = document.querySelector('.checkbox-group');
    if (!checkboxGroup) return;
    
    // 기존 내용 제거
    checkboxGroup.innerHTML = '';
    
    // 데이터베이스에서 가져온 항목 추가
    positiveAspectsData.forEach(aspect => {
        const label = document.createElement('label');
        label.className = 'checkbox-item';
        label.innerHTML = `
            <input type="checkbox" name="positiveAspects" value="${aspect.aspect_code}">
            <span>${aspect.aspect_text}</span>
        `;
        checkboxGroup.appendChild(label);
    });
    
    // 기타 옵션 추가
    const otherLabel = document.createElement('label');
    otherLabel.className = 'checkbox-item';
    otherLabel.id = 'positiveOtherCheckbox';
    otherLabel.innerHTML = `
        <input type="checkbox" name="positiveAspects" value="other">
        <span>Khác</span>
    `;
    checkboxGroup.appendChild(otherLabel);
    
    // 기타 체크박스 이벤트 리스너 다시 연결
    const otherCheckbox = otherLabel.querySelector('input[type="checkbox"]');
    otherCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            positiveOtherSection.style.display = 'block';
        } else {
            positiveOtherSection.style.display = 'none';
            positiveOther.value = '';
        }
    });
}

// 개선사항 드롭다운 UI 업데이트
function updateComplaintListUI() {
    const select = document.getElementById('complaintSelect');
    if (!select) return;
    
    // 기존 옵션 제거 (첫 번째 옵션 제외)
    while (select.options.length > 1) {
        select.remove(1);
    }
    
    // 없음 옵션 추가
    const noneOption = document.createElement('option');
    noneOption.value = 'none';
    noneOption.textContent = 'Không có - Rất hài lòng';
    select.appendChild(noneOption);
    
    // 데이터베이스에서 가져온 항목 추가
    complaintListData.forEach(complaint => {
        const option = document.createElement('option');
        option.value = complaint.complaint_code;
        option.textContent = complaint.complaint_text;
        select.appendChild(option);
    });
}

// 이미지 압축 함수 (선택사항으로 변경)
async function compressImage(file, maxWidth = 1200, quality = 0.8) {
    // 파일 크기가 1MB 미만이면 압축하지 않음
    if (file.size < 1024 * 1024) {
        console.log('Kích thước file nhỏ nên không cần nén.');
        return file;
    }
    
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                
                // 이미지 크기 조정
                if (width > maxWidth) {
                    height = (maxWidth / width) * height;
                    width = maxWidth;
                }
                
                canvas.width = width;
                canvas.height = height;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                // 원본 파일의 타입을 유지
                const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
                
                // 압축된 이미지를 Blob으로 변환
                canvas.toBlob((blob) => {
                    if (blob) {
                        const compressedFile = new File([blob], file.name, {
                            type: outputType,
                            lastModified: Date.now()
                        });
                        console.log('Hoàn thành nén:', {
                            'Gốc': file.size,
                            'Đã nén': compressedFile.size,
                            'Loại': compressedFile.type
                        });
                        resolve(compressedFile);
                    } else {
                        reject(new Error('Nén ảnh thất bại'));
                    }
                }, outputType, quality);
            };
            img.onerror = () => reject(new Error('Tải ảnh thất bại'));
        };
        reader.onerror = () => reject(new Error('Đọc file thất bại'));
    });
}

// Storage 버킷 생성 함수 (한 번만 실행)
async function createStorageBucket() {
    try {
        // 이 함수는 Supabase 대시보드에서 수동으로 버킷을 생성해야 합니다
        console.log('Vui lòng tạo storage bucket "customers_photo" trong bảng điều khiển Supabase.');
    } catch (error) {
        console.error('Lỗi khi tạo storage bucket:', error);
    }
}

// complaint 드롭다운 변경 이벤트 (DOM 로드 후 추가)
function setupComplaintSelectListener() {
    if (complaintSelect) {
        complaintSelect.addEventListener('change', (e) => {
            if (e.target.value === 'other') {
                otherComplaintSection.style.display = 'block';
            } else {
                otherComplaintSection.style.display = 'none';
                otherComplaint.value = '';
            }
        });
    }
}

// 사진 미리보기 및 압축
function setupPhotoUploadListener() {
    if (photoUpload) {
        photoUpload.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                try {
                    // 로딩 표시
                    photoPreview.innerHTML = '<div class="loading">Đang xử lý hình ảnh...</div>';
                    
                    // 이미지 압축
                    const compressedFile = await compressImage(file);
                    uploadedPhotoFile = compressedFile;
                    
                    // 미리보기 표시
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        photoPreview.innerHTML = `
                            <img src="${e.target.result}" alt="Ảnh đã tải lên">
                            <div class="photo-info">
                                <span>Gốc: ${(file.size / 1024 / 1024).toFixed(2)}MB</span>
                                <span>Đã nén: ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB</span>
                            </div>
                        `;
                    };
                    reader.readAsDataURL(compressedFile);
                } catch (error) {
                    console.error('Lỗi xử lý hình ảnh:', error);
                    photoPreview.innerHTML = '<div class="error">Có lỗi xảy ra khi xử lý hình ảnh.</div>';
                }
            }
        });
    }
}

// 디지털 링크 유효성 검사 함수
async function validateDigitalLink(digitalLink) {
    try {
        console.log('Bắt đầu kiểm tra tính hợp lệ của liên kết kỹ thuật số:', digitalLink);
        
        // Edge Function 호출
        const { data, error } = await supabaseClient.functions.invoke('validate-digital-link', {
            body: { digitalLink }
        });
        
        if (error) {
            console.error('Lỗi Edge Function kiểm tra tính hợp lệ:', error);
            return {
                valid: false,
                reason: 'error',
                message: 'Có lỗi xảy ra khi xác minh liên kết.'
            };
        }
        
        console.log('Kết quả kiểm tra tính hợp lệ:', data);
        return data;
        
    } catch (error) {
        console.error('Lỗi kiểm tra tính hợp lệ:', error);
        return {
            valid: false,
            reason: 'error',
            message: 'Có lỗi xảy ra khi xác minh liên kết.'
        };
    }
}

// 디지털 링크 중복 확인 함수
async function checkDuplicateDigitalLink(digitalLink) {
    try {
        const { data, error } = await supabaseClient
            .from('customer_feedbacks')
            .select('id, created_at')
            .eq('digital_photo_link', digitalLink)
            .limit(1);
        
        if (error) throw error;
        
        return data && data.length > 0;
    } catch (error) {
        console.error('Lỗi kiểm tra trùng lặp:', error);
        return false;
    }
}

// HeadsUp 디지털 사진 다운로드 및 백업 함수
async function backupDigitalPhoto(digitalLink) {
    try {
        console.log('Bắt đầu sao lưu ảnh kỹ thuật số:', digitalLink);
        
        // HeadsUp 링크인지 확인
        if (!digitalLink.includes('headsup.mx2.co.kr/@HUW')) {
            console.log('Không phải liên kết HeadsUp nên không cần sao lưu.');
            return null;
        }
        
        // Edge Function을 통해 디지털 사진 백업
        console.log('Đang gọi Edge Function...');
        const { data, error } = await supabaseClient.functions.invoke('backup-digital-photo', {
            body: { digitalLink }
        });
        
        if (error) {
            console.error('Lỗi Edge Function:', error);
            // 오류가 발생해도 피드백 저장은 계속
            return null;
        }
        
        if (data && data.storageUrl) {
            console.log('Sao lưu ảnh kỹ thuật số thành công:', data.storageUrl);
            return data.storageUrl;
        }
        
        return null;
        
    } catch (error) {
        console.error('Lỗi sao lưu ảnh kỹ thuật số:', error);
        // 백업 실패해도 피드백 저장은 계속
        return null;
    }
}

// 폼 제출 처리
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 버튼 비활성화 및 로딩 표시
    const submitButton = form.querySelector('.submit-button');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loading-spinner"></span> Vui lòng chờ...';
    submitButton.classList.add('loading');
    
    // 이전 오류 메시지 지우기
    errorMessage.style.display = 'none';
    errorMessage.innerHTML = '';
    
    try {
        // 사진 필수 검증 (둘 다 필수)
        const digitalLink = document.getElementById('digitalLink').value;
        if (!digitalLink) {
            alert('Vui lòng nhập liên kết ảnh kỹ thuật số.');
            submitButton.disabled = false;
            submitButton.textContent = 'Gửi ý kiến';
            submitButton.classList.remove('loading');
            return;
        }
        
        // 1. 디지털 링크 중복 확인 (먼저 검사)
        const isDuplicate = await checkDuplicateDigitalLink(digitalLink);
        if (isDuplicate) {
            // 중복된 링크 메시지 표시
            errorMessage.style.display = 'block';
            errorMessage.innerHTML = `
                <div class="duplicate-error">
                    <h3>⚠️ Liên kết đã được sử dụng</h3>
                    <p>Liên kết ảnh kỹ thuật số này đã được sử dụng trong phản hồi khác.</p>
                    <p>Vui lòng sử dụng liên kết ảnh mới.</p>
                </div>
            `;
            submitButton.disabled = false;
            submitButton.textContent = 'Gửi ý kiến';
            submitButton.classList.remove('loading');
            return;
        }
        
        // 2. 디지털 링크 유효성 검사 (중복이 아닌 경우에만)
        const validationResult = await validateDigitalLink(digitalLink);
        if (!validationResult.valid) {
            // 유효하지 않은 링크 메시지 표시
            errorMessage.style.display = 'block';
            
            let iconAndTitle = '';
            if (validationResult.reason === 'expired') {
                iconAndTitle = '⏰ Liên kết đã hết hạn';
            } else if (validationResult.reason === 'not_found') {
                iconAndTitle = '❌ Liên kết không hợp lệ';
            } else if (validationResult.reason === 'invalid_domain') {
                iconAndTitle = '⚠️ Định dạng liên kết không đúng';
            } else {
                iconAndTitle = '⚠️ Xác minh liên kết thất bại';
            }
            
            errorMessage.innerHTML = `
                <div class="validation-error">
                    <h3>${iconAndTitle}</h3>
                    <p>${validationResult.message}</p>
                    <small>Liên kết hiện tại: ${digitalLink}</small>
                </div>
            `;
            submitButton.disabled = false;
            submitButton.textContent = 'Gửi ý kiến';
            return;
        }
        
        if (!uploadedPhotoFile) {
            alert('Vui lòng tải lên ảnh thực tế.');
            submitButton.disabled = false;
            submitButton.textContent = 'Gửi ý kiến';
            submitButton.classList.remove('loading');
            return;
        }
        
        // 좋았던 점 필수 검증
        const positiveAspects = document.querySelectorAll('input[name="positiveAspects"]:checked');
        if (positiveAspects.length === 0) {
            alert('Vui lòng chọn ít nhất 1 điều bạn hài lòng.');
            submitButton.disabled = false;
            submitButton.textContent = 'Gửi ý kiến';
            submitButton.classList.remove('loading');
            return;
        }
        
        // 평점 수집
        const ratingValue = document.querySelector('input[name="rating"]:checked').value;
        const correctedRating = parseInt(ratingValue); // 1->1, 2->2, 3->3, 4->4, 5->5
        
        // 좋았던 점 수집
        const positiveAspectsArray = Array.from(positiveAspects).map(cb => cb.value);
        const positiveAspectsData = {
            aspects: positiveAspectsArray,
            other: positiveAspectsArray.includes('other') ? positiveOther.value : null
        };
        
        // 긍정적/부정적 피드백 준비
        const positiveFeedback = positiveAspectsArray.length > 0 ? {
            aspects: positiveAspectsArray,
            other_text: positiveAspectsArray.includes('other') ? positiveOther.value : null
        } : null;
        
        const negativeFeedback = (complaintSelect.value && complaintSelect.value !== '' && complaintSelect.value !== 'none') ? {
            code: complaintSelect.value,
            other_text: complaintSelect.value === 'other' ? otherComplaint.value : null
        } : null;
        
        // 폼 데이터 수집
        const formData = {
            rating: correctedRating,
            digital_photo_link: digitalLink,
            customer_opinion: document.getElementById('opinion').value || null,
            would_recommend: document.getElementById('recommend').checked,
            booth_location: document.getElementById('location').value || null,
            physical_photo_url: null,
            positive_feedback: positiveFeedback,
            negative_feedback: negativeFeedback
        };
        
        // 사진 업로드 처리
        if (uploadedPhotoFile) {
            try {
                console.log('Bắt đầu tải ảnh lên...');
                console.log('Kích thước file:', uploadedPhotoFile.size);
                console.log('Loại file:', uploadedPhotoFile.type);
                
                // 고유한 파일명 생성
                const timestamp = new Date().getTime();
                const fileName = `${timestamp}_${uploadedPhotoFile.name}`;
                console.log('Tên file sẽ tải lên:', fileName);
                
                // Storage에 업로드 (customers-photo 버킷에)
                const { data: uploadData, error: uploadError } = await supabaseClient.storage
                    .from('customers-photo')
                    .upload(fileName, uploadedPhotoFile, {
                        cacheControl: '3600',
                        upsert: false
                    });
                
                if (uploadError) {
                    console.error('Lỗi tải ảnh lên:', uploadError);
                    console.error('Chi tiết lỗi:', uploadError.message, uploadError.statusCode);
                    // Storage 버킷이 없는 경우 안내
                    if (uploadError.message.includes('not found') || uploadError.message.includes('Bucket not found')) {
                        alert('Đang thiết lập Storage. Ảnh sẽ được tải lên sau. Phản hồi được lưu bình thường.');
                    } else {
                        throw uploadError;
                    }
                } else {
                    console.log('Tải lên thành công:', uploadData);
                    // 업로드 성공 시 공개 URL 생성
                    const { data: { publicUrl } } = supabaseClient.storage
                        .from('customers-photo')
                        .getPublicUrl(fileName);
                    
                    formData.physical_photo_url = publicUrl;
                    console.log('Tải ảnh lên thành công! URL:', publicUrl);
                }
            } catch (storageError) {
                console.warn('Lỗi Storage:', storageError);
                // 사진 업로드 실패해도 피드백은 계속 저장
            }
        }
        
        // 디지털 사진 백업 시도
        console.log('=== Bắt đầu sao lưu ảnh kỹ thuật số ===');
        console.log('Liên kết kỹ thuật số đã nhập:', digitalLink);
        const digitalPhotoStorageLink = await backupDigitalPhoto(digitalLink);
        console.log('Giá trị trả về từ hàm sao lưu:', digitalPhotoStorageLink);
        
        if (digitalPhotoStorageLink) {
            formData.digital_photo_storage_link = digitalPhotoStorageLink;
            console.log('✅ Đã thêm URL sao lưu vào formData:', digitalPhotoStorageLink);
        } else {
            console.warn('⚠️ URL sao lưu là null. Không phải liên kết HeadsUp hoặc sao lưu thất bại');
            console.log('💡 Mẹo: Liên kết HeadsUp phải bắt đầu bằng http://headsup.mx2.co.kr/@HUW');
        }
        
        console.log('formData cuối cùng:', formData);
        
        // 프로모션 코드 가져오기
        let promotionCode = null;
        let promotionDiscount = null;
        
        try {
            console.log('Bắt đầu lấy mã khuyến mãi...');
            
            // 사용 가능한 프로모션 코드 가져오기
            const { data: promoData, error: promoError } = await supabaseClient
                .from('promotion_code')
                .select('promotion_code, discount_amount')
                .eq('isUsed', false)
                .order('created_at')
                .limit(1)
                .single();
            
            console.log('Kết quả truy vấn mã khuyến mãi:', promoData, promoError);
            
            if (!promoError && promoData) {
                promotionCode = promoData.promotion_code;
                promotionDiscount = promoData.discount_amount;
                
                // 프로모션 코드를 사용됨으로 표시
                const { error: updateError } = await supabaseClient
                    .from('promotion_code')
                    .update({ 
                        'isUsed': true, 
                        used_at: new Date().toISOString() 
                    })
                    .eq('promotion_code', promotionCode);
                
                if (!updateError) {
                    console.log('Phát hành mã khuyến mãi thành công:', promotionCode);
                    console.log('Số tiền giảm giá:', promotionDiscount, 'VND');
                    formData.promotion_code_used = promotionCode;
                } else {
                    console.error('Lỗi cập nhật mã khuyến mãi:', updateError);
                }
            } else {
                console.warn('Không có mã khuyến mãi khả dụng.');
            }
        } catch (promoErr) {
            console.error('Lỗi xử lý mã khuyến mãi:', promoErr);
            // 프로모션 코드 오류가 있어도 피드백은 계속 저장
        }
        
        // 데이터베이스에 저장
        const { data, error } = await supabaseClient
            .from('customer_feedbacks')
            .insert([formData])
            .select();
        
        if (error) {
            throw error;
        }
        
        // 성공 처리
        console.log('Lưu phản hồi thành công. Dữ liệu đã lưu:', data[0]);
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        // 프로모션 코드가 있으면 UI에 표시
        if (promotionCode) {
            console.log('Hiển thị mã khuyến mãi trên UI:', promotionCode, promotionDiscount);
            const couponContainer = document.querySelector('.coupon-container');
            if (couponContainer) {
                couponContainer.innerHTML = `
                    <h3>🎁 Phiếu giảm giá đặc biệt</h3>
                    <p class="coupon-value">${promotionDiscount.toLocaleString()} VND</p>
                    <p class="coupon-code">${promotionCode}</p>
                    <p class="coupon-info">1. Sử dụng nó vào lần tiếp theo bạn đến (nhập coupon khi bạn thanh toán tại máy)</p>
                    <p class="coupon-info">2. Nếu như bạn nhập mã mà không dùng luôn thì coupon sẽ bị vô hiệu</p>
                `;
            }
        } else {
            // 프로모션 코드가 없을 때 기본 메시지
            const couponContainer = document.querySelector('.coupon-container');
            if (couponContainer) {
                couponContainer.innerHTML = `
                    <h3>🎉 Cảm ơn bạn!</h3>
                    <p class="coupon-info">Cảm ơn bạn đã dành thời gian chia sẻ ý kiến quý báu.</p>
                `;
            }
        }
        
        // 로컬 저장소에 피드백 ID 저장 (중복 제출 방지)
        localStorage.setItem('lastFeedbackId', data[0].id);
        localStorage.setItem('lastSubmitTime', Date.now().toString());
        
    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = `<p>Có lỗi xảy ra: ${error.message}</p>`;
        
        // 버튼 다시 활성화
        submitButton.disabled = false;
        submitButton.textContent = 'Gửi ý kiến';
        submitButton.classList.remove('loading');
    }
});

// 폼 리셋
function resetForm() {
    form.reset();
    form.style.display = 'block';
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    photoPreview.innerHTML = '';
    uploadedPhotoFile = null;
    otherComplaintSection.style.display = 'none';
    positiveOtherSection.style.display = 'none';
    
    // 좋았던 점 체크박스 해제
    document.querySelectorAll('input[name="positiveAspects"]').forEach(cb => cb.checked = false);
    
    // 평점 기본값 설정 (5개 별)
    document.getElementById('star5').checked = true;
    document.getElementById('recommend').checked = true;
    
    // 별점 표시 업데이트
    if (window.initializeStarRating) {
        const ratingContainer = document.querySelector('.rating-container');
        const stars = ratingContainer.querySelectorAll('label');
        stars.forEach((star, index) => {
            if (index < 5) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
}

// 페이지 로드 시 초기화
window.addEventListener('load', async () => {
    // 이벤트 리스너 설정
    setupComplaintSelectListener();
    setupPhotoUploadListener();
    
    // 데이터 로드
    await loadInitialData();
    
    // 최근 제출 확인
    const lastFeedbackId = localStorage.getItem('lastFeedbackId');
    if (lastFeedbackId) {
        // 최근에 제출한 기록이 있으면 알림
        const lastSubmitTime = localStorage.getItem('lastSubmitTime');
        if (lastSubmitTime) {
            const timeDiff = Date.now() - parseInt(lastSubmitTime);
            const hoursDiff = timeDiff / (1000 * 60 * 60);
            
            if (hoursDiff < 24) {
                const confirmNew = confirm('Bạn đã gửi phản hồi gần đây. Bạn có muốn viết phản hồi mới không?');
                if (!confirmNew) {
                    form.style.display = 'none';
                    successMessage.style.display = 'block';
                }
            }
        }
    }
});

// Star rating system
function initializeStarRating() {
    const ratingContainer = document.querySelector('.rating-container');
    const stars = ratingContainer.querySelectorAll('label');
    const inputs = ratingContainer.querySelectorAll('input[type="radio"]');
    
    // Update star display based on current selection
    function updateStars() {
        const checkedInput = ratingContainer.querySelector('input[type="radio"]:checked');
        const selectedValue = checkedInput ? parseInt(checkedInput.value) : 0;
        
        stars.forEach((star, index) => {
            if (index < selectedValue) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
    
    // Handle hover effects
    stars.forEach((star, index) => {
        star.addEventListener('mouseenter', () => {
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.add('hover');
                } else {
                    s.classList.remove('hover');
                }
            });
        });
        
        star.addEventListener('click', () => {
            // 클릭 애니메이션
            star.style.transform = 'scale(1.5)';
            setTimeout(() => {
                star.style.transform = 'scale(1.2)';
                updateStars();
            }, 200);
        });
    });
    
    // Reset hover on mouse leave
    ratingContainer.addEventListener('mouseleave', () => {
        stars.forEach(star => {
            star.classList.remove('hover');
        });
    });
    
    // Update stars when radio changes
    inputs.forEach(input => {
        input.addEventListener('change', updateStars);
    });
    
    // Initial update
    updateStars();
}

// Initialize star rating on page load
window.addEventListener('DOMContentLoaded', initializeStarRating);

// 디버깅을 위한 콘솔 로그
console.log('Hệ thống phản hồi khách hàng đã khởi tạo hoàn tất');
console.log('Supabase URL:', SUPABASE_URL);
console.log('Tên bucket Storage: customers-photo');
console.log('Lưu đánh giá: 1 sao=1 điểm, 5 sao=5 điểm trong cơ sở dữ liệu');

// 글로벌 함수로 만들기
window.resetForm = resetForm;