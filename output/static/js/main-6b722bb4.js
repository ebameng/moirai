define(function() {
  var onUploadHeadImage, updateMyNickname, updateMySignature, _bindEvents;
  updateMyNickname = function() {
    return $('#security .basics .submit').on('click', function(e) {
      var $nickname, nickname;
      $nickname = $('#security .basics input[name="nickname"]');
      nickname = $nickname.val();
      nickname = $.trim(nickname);
      if (!nickname) {
        return utils.bubble('昵称不能为空');
      }
      return $.ajax({
        type: 'post',
        method: 'post',
        url: '/_bridge/admin/self/update/nickname',
        data: {
          nickname: nickname
        },
        success: function(rs, succ) {
          if (rs['node_code'] !== 20000) {
            return utils.bubble(rs['data']['msg']);
          }
          utils.bubble('修改成功');
          return location.reload();
        },
        error: function() {}
      });
    });
  };
  updateMySignature = function() {
    $('#security  .signature .submit').on('click', function(e) {
      var $content, content, sex;
      $content = $('#security  .signature textarea[name="content"]');
      content = $content.val();
      content = $.trim(content);
      sex = $('#security  .signature .button.active').data('id') || 'female';
      if (!content) {
        return utils.bubble('签名不能为空');
      }
      return $.ajax({
        type: 'post',
        method: 'post',
        url: '/_bridge/admin/self/update',
        data: {
          content: content,
          sex: sex
        },
        success: function(rs, succ) {
          if (rs['node_code'] !== 20000) {
            return utils.bubble(rs['data']['msg']);
          }
          utils.bubble('修改成功');
          return location.reload();
        },
        error: function() {}
      });
    });
    return $('#security  .signature .button').on('click', function(e) {
      $(this).addClass('red active');
      return $(this).siblings().removeClass('red active');
    });
  };
  onUploadHeadImage = function($scope) {
    return $scope.on('click', '.update-head-image', function(e) {
      var $form, $this;
      $form = $scope.find('form[name=head-image]');
      $this = $(this);
      if (!$form[0].checkValidity()) {
        return utils.bubble('请上传图片');
      }
      if ($this.hasClass('loading-effect')) {
        return;
      }
      $this.addClass('loading-effect');
      return $scope.find('form[name=head-image]').ajaxSubmit({
        beforeSubmit: function() {},
        success: function(rs) {
          $this.removeClass('loading-effet');
          if (rs['node_code'] !== 20000) {
            return utils.bubble(rs['data']['msg']);
          }
          utils.bubble('修改成功');
          return location.reload();
        }
      });
    });
  };
  _bindEvents = function($scope) {
    updateMyNickname();
    updateMySignature();
    return onUploadHeadImage($scope);
  };
  return {
    init: function() {
      var $scope;
      $scope = $('#security');
      return _bindEvents($scope);
    }
  };
});
